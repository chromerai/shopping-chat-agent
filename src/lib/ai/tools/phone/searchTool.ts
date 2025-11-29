import { supabase } from '@/lib/db/supabase';
import { PhoneFilters } from '../../types';
import { Phone } from '@/types/shopping'

export class PhoneSearchTool {
  static async searchPhones(filters: PhoneFilters): Promise<Phone[]> {
    try {
      let query = supabase.from('phones').select('*');

      // Apply filters
      if (filters.brand) {
        query = query.ilike('brand', `%${filters.brand}%`);
      }

      if (filters.minPrice !== undefined) {
        query = query.gte('price', filters.minPrice);
      }

      if (filters.maxPrice !== undefined) {
        query = query.lte('price', filters.maxPrice);
      }

      if (filters.operating_system) {
        query = query.ilike('specs->>os', `${filters.operating_system}`);
      }

      if (filters.minDisplaySize) {
        query = query.gte('specs->display_size', filters.minDisplaySize);
      }
              
      if (filters.maxDisplaySize) {
        query = query.lte('specs->display_size', filters.maxDisplaySize);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error searching phones:', error);
        return [];
      }

      return data as Phone[];
    } catch (error) {
      console.error('Exception in searchPhones:', error);
      return [];
    }
  }
}