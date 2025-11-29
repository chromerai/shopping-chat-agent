// lib/ai/tools/index.ts
import { RecommendationTool } from './phone/recommendationTool';
import { ComparisonTool } from './phone/compareTool';
import { DetailTool } from './phone/detailTool';
import { SafetyTools } from './safety/safetyTools';
import { HumanInputTool } from './utility/clarificationTool';
import { WebSearchTool } from './utility/webSearchTool';

export const ALL_TOOLS = {
  // Product data tools
  get_recommendations: (input: string, context: any) => 
    RecommendationTool.getRecommendations(input, context),
  compare_products: (input: any, context: any) => 
    ComparisonTool.compareProducts(input),
  get_product_details: (input: string, context: any) => 
    DetailTool.getProductDetails(input,),
  
  //utility tools
  ask_clarification: (input: string, context: any) => 
    HumanInputTool.askHuman(input, context), 
  search_web: (input: string, context: any) => 
    WebSearchTool.searchWeb(input),
  
  // Safety tool
  check_safety: (input: string, context: any) => 
    SafetyTools.safetyCheck(input),
};

export type ToolName = keyof typeof ALL_TOOLS;