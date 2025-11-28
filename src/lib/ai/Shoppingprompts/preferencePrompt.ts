import { z } from "zod"

export const PREFERENCE_PROMPT = `
Analyse this phone recommendation request and extract user preferences.

Query: {query}

Additional context: {context} 

Extract the following: 
- Primary use Case (photography, gaming, productivity, general use, etc )
- Size preferences if mentioned ( compact, standard, large )
- Budget range if mentioned (in Indian Rupees)
- Brand preferences if mentioned
- Operating System preferences ( Android, iOS)
- Any specific features or requirements

Respond with JSON 
{
    "use_case": string,
    "size_preferences": "compact" | "standard" | "large" | null
    "feature_priorities": string[] | null
    "budget": {"min": number, "max": number} | null,
    "brand_preferences": string[],
    "os_preference": "android" | "ios" | null,
}
`

const budgetSchema = z.object({
  min: z.number().describe('The minimum budget represented in INR).'),
  max: z.number().describe('The maximum budget represented in INR).'),
}).describe('A defined range for the user\'s budget preference in INR');

export const PREFERENCE_PROMPT_SCHEMA = z.object({
    use_case: z.string().describe("Primary sceanrio or use-case for the mobile phone like photography, gaming, general use, productivity, work"),
    size_preference: z.enum(['compact', 'standard', 'large'])
    .nullable()
    .describe("The preferred physical size of the device. Can be null if the user has no preference."),
    feature_priorities: z.array(z.string())
    .describe('A list of specific features the user prioritizes (e.g., "high refresh rate", "stylus support"). Can be null if no specific features are listed.'),
  budget: budgetSchema
    .nullable()
    .describe('The user\'s minimum and maximum spending range. Can be null if the budget is not specified.'),
  brand_preferences: z.array(z.string())
    .describe('A list of preferred brands (e.g., "Samsung", "Apple", "OPPO"). This list should be empty if there are no preferences.'),
  os_preference: z.enum(['android', 'ios'])
    .nullable()
    .describe('The desired operating system. Can be null if the user is flexible.'),
}).describe('A comprehensive schema defining user preferences for a technology product.');

export type preferencePromptResponse = z.infer<typeof PREFERENCE_PROMPT_SCHEMA>;