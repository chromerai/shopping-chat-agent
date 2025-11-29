import { supabase } from "@/lib/db/supabase";
import { Phone } from '@/types/shopping'
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
    const cleanedName = productName.toLowerCase().trim();
    
     let { data } = await supabase
            .from('phones')
            .select('*')
            .ilike('brand', `${cleanedName}%`)
            .limit(1);

      if (data && data.length > 0) {
          return data[0] as Phone;
      }

        // Try prefix match on model (USES idx_phones_model)
      ({ data } = await supabase
          .from('phones')
          .select('*')
          .ilike('model', `${cleanedName}%`)
          .limit(1));

      if (data && data.length > 0) {
          return data[0] as Phone;
      }

        // Fallback to contains search (won't use indexes efficiently)
      ({ data } = await supabase
          .from('phones')
          .select('*')
          .or(`model.ilike.%${cleanedName}%,brand.ilike.%${cleanedName}%`)
          .limit(1));
      
      return data?.[0] as Phone || null;
  }
}