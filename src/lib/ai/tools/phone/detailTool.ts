import { supabase } from "@/lib/db/supabase";
import { Phone } from "@/types/shopping"

export class DetailTool {
    static async getProductDetails(productName: string): Promise<{product: Phone | null}> {
        try {
        const product = await this.findProductByName(productName);
        return { product };
        } catch (error) {
        console.error('Exception in getProductDetails:', error);
        return { product: null };
        }
    }

    static async findProductByName(productName: string): Promise<Phone | null> {
    const cleanedName = productName.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
    
    let { data, error } = await supabase
      .from('phones')
      .select('*')
      .or(`model.ilike.%${cleanedName}%,brand.ilike.%${cleanedName}%`)
      .limit(1);

    if (error || !data || data.length === 0) {
      return null;
    }
    
    return data[0] as Phone;
  }
}