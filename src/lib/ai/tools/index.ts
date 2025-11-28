// lib/ai/tools/index.ts
import { RecommendationTool } from './phone/recommendationTool';
import { ComparisonTool } from './phone/compareTool';
import { DetailTool } from './phone/detailTool';
import { SafetyTools } from './safety/safetyTools';
import { HumanInputTool } from './utility/clarificationTool';
import { WebSearchTool } from './utility/webSearchTool';

export const ALL_TOOLS = {
  // Product data tools
  get_recommendations: RecommendationTool.getRecommendations,
  compare_products: ComparisonTool.compareProducts,
  get_product_details: DetailTool.getProductDetails,
  
  //utility tools
  ask_clarification: HumanInputTool.askHuman, 
  search_web: WebSearchTool.searchWeb,
  
  // Safety tool
  check_safety: SafetyTools.safetyCheck,
};

export type ToolName = keyof typeof ALL_TOOLS;