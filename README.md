# **Mobile Shopping Agent**

A sophisticated AI-powered shopping assistant for mobile phones built with Next.js, TypeScript, and a custom ReAct agent architecture. The agent helps users find, compare, and get recommendations for mobile phones through multi-turn natural conversations with dynamic tool usage.

## **Table of Contents**

- Setup Instructions
- Tech Stack & Architecture
- Agent System & ReAct Loop
- Tool System
- Prompt Design & Safety Strategy
- Known Limitations

## Setup Instructions

### Prerequisites

- Node.js 18+

- Redis server (for session management)

- Supabase account (for database)

- Google Gemini API key

### Installation

1. Clone the repository

```bash
git clone <your-repository-url>
cd shopping-agent
```

2. Install dependencies

```bash
npm install
```

3. Environment Configuration
    Create `.env.local` file for the following variables

```env
# Redis Configuration
REDIS_URL=your_redis_connection_string

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Configuration
GEMINI_API_KEY=your_google_gemini_api_key

# Optional: Exa AI for web search
EXA_API_KEY=your_exa_api_key
```

4. Database Setup

- Create a phones table in Supabase with your schema
- Run the population script to add mock data:

```bash
# Execute the SQL file in your Supabase SQL editor
psql -f lib/db/populate_phones.sql
```

5. Run the development server

```bash
npm run dev
```

## Tech Stack & Architecture

### Core Technologies

- **frontend**: Next.js 14 with TypeScript, Tailwind CSS
- **Backend**: Next.js API ROUTES
- **AI/ML**: Google Gemini API with structured output parsing( through Google GenAi)
- **Database**: Supabase (PostgreSQL)
- **Session Management**: Redis with Custom Session Manager
- **Agent Framework**: Custom ReAct(Reasoning-Action) Agent implementation
- **Validation**: Zod for structured AI response validation

### Architecture

```text
User Interface (Mobile) 
    ↓
Next.js App Router (/api/chat/route.ts)
    ↓
Safety Layer (Rule-based + LLM safety checks)
    ↓
Shopping Agent (ReAct Agent with Max 5 iterations)
    ↓
ReAct Loop: Thought → Action → PAUSE → Observation
    ↓
Tool Execution System
    ├── SearchTool (find phones by criteria)
    ├── RecommendationTool (suggest phones)
    ├── CompareTool (compare multiple phones)
    ├── DetailTool (get detailed specifications)
    ├── SafetyTools (content moderation)
    ├── ClarificationTool (handle ambiguous queries)
    └── WebSearchTool (external information)
    ↓
Session Manager (Redis) → Context Persistence
    ↓
Database (Supabase - phones table)
```

## Agent System & ReAct Loop

### Core ReAct Implementation

The agent implements a sophisticated Reasoning-Action loop with the following flow:

```typescript
// Simplified loop structure
for (let i = 0; i < this.MAX_ITERATIONS; i++) {
  // 1. THOUGHT: LLM analyzes context and decides next action
  const llmResponse = await this.getLLMResponse(messages, currentContext, i)
  
  // 2. ACTION: Execute chosen tool or provide final answer
  if (llmResponse.answer) {
    return finalResponse; // Loop exit condition
  }
  
  // 3. OBSERVATION: Get tool execution results
  const observation = await this.executeAction(llmResponse.action, llmResponse.action_input)
  
  // 4. CONTEXT UPDATE: Accumulate knowledge for next iteration
  currentContext = this.updateContext(currentContext, action, observation)
}
```

## Key Features

- **Max 5 Iterations**: Prevents infinite loops while allowing complex reasoning
- **Context Persistence**: Maintains conversation state across tool calls
- **Human In The Loop**: Can pause execution to ask users for clarification
- **Structured Outputs**: Uses Zod schemas to ensure reliable AI responses
- **Error Recovery**: Graceful handling of tool failures and parsing errors

## Session Management

- Redis-based session storage for conversation history
- Context accumulation across multiple user interactions
- Automatic session expiration and cleanup

## Tool System
The agent has access to comprehensive set of Tools

| Tool | Purpose | Example |
| :--- | :--- | :--- |
|`get_recommendation` | Find matching Criteria | `{user_query: "best budget phone under 30k"}`|
|`compare_products` | Compare 2-3 phones | `{phone_names: ["iPhone 15", "Samsung S24"]}`|
|`get_product_details` | Get phone specifications | `{phone_name: "iPhone 15 Pro"}`|
|`search_web` | External information lookup | `{query: "latest smartphone processor"}`|
|`ask_clarification` | Request missing information | `{question: "What's your preferred brand?"}`|

## Prompt Design & Safety Strategy

### Multi-Layer Safety System

#### 1. Rule Based Safety Check

- **Pattern Matching**: Regex patterns for detecting malicious intent and prompt injection attempts
- **Off-Topic Detection**: Filters for non-phone related queries (politics, medical advice, etc.)
- **Red Flag Detection**: Identifies attempts to bypass system instructions or extract internal information

#### 2. LLM Safety Analysis

- **Intent Classification**: AI-powered analysis of query safety and appropriateness
- **Content Categorization**: Classifies queries as 'shopping', 'off_topic', or 'malicious'
- **Graceful Fallback**: Robust error handling with appropriate user responses when LLM fails

### Safety Implementation Details

```typescript
// Rule-based patterns include:
RED_FLAGS = [
  /system prompt|instructions?|how are you programmed/i,
  /api key|password|secret|token|credientials/i,
  /ignore|override|break|bypass|hack/i,
  // ... more patterns
]

OFF_TOPIC_PATTERNS = [
  /politics|religion|sex|violence|illegal/i,
  /medical advice|financial advice|legal advice/i,
  /other products|not phones|cars|tv|headphones/i,
]
```
### Prompt Architecture

**System Prompt**: Implements the ReAct pattern with:

- Clear action definitions and examples
- Context resolution instructions for pronoun handling
- Brand neutrality and factual accuracy requirements
- Iteration management and exit conditions

**Safety Prompt**: Analyzes queries for security risks and relevance to phone shopping, 
using structured classification to detect prompt injection, 
sensitive information requests, and off-topic content.

**Preference Prompt**: Extracts user preferences from queries including use cases, 
budget ranges, brand preferences, and feature priorities to enable personalized phone recommendations.

### Structured Output Validation

All LLM responses are validated against Zod schemas to ensure proper formatting:

```typescript
export const SYSTEM_CHECK_SCHEMA = z.object({
    thought: z.string().describe("Step-by-step reasoning"),
    action: AvailableActions.describe("The action to execute"),
    action_input: z.record(z.string(), z.any()).optional(),
    answer: z.string().optional().describe("Final answer when not taking action")
})
```

## KNOWN LIMITATIONS

### Agent System Limitations

- **Max 5 Iterations**: Complex multi-step queries may hit iteration limits
- **Context Window**: Limited by Gemini's context length for long conversations
- **Tool Calling Accuracy**: Occasional misclassification of when to use specific tools
- **State Management**: Session context may become large over long conversations
- **No Monitoring**: Currently only logs errors to console; no response time tracking 
or token counting (though outputs are restricted to 1024 max tokens)

### Data Limitations

- **Limited Inventory**: Only 60 mobile phones in the database
- **Static Data**: Mock data may not reflect current market availability
- **No Real-time Pricing**: Cannot provide live pricing or availability
- There are some APIs that provide mobile info, however they are not reliable or consistent and mostly for US, EU and Canada but not India.

### Technical Limitations

- **External API Dependencies**: Gemini, Supabase, and Redis availability
- **Rate Limiting**: Subject to external API rate limits
- **Session Timeouts**: Redis sessions have expiration limits

<hr />

**Development Timeline**: This sophisticated agent system was built in approximately 4 days, demonstrating rapid prototyping of complex AI architectures.

**Note**: This is a demonstration project focusing on AI agent capabilities rather than comprehensive e-commerce functionality. The architecture is designed to be extensible for additional tools and data sources.