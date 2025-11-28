import { Phone, ComparisonResult } from "../../types"
import { supabase } from "@/lib/db/supabase";

export class ComparisonTool {
    static async compareProducts(productNames: string[]): Promise<ComparisonResult> {
        try {
            if(productNames.length < 2 || productNames.length > 2) {
                throw new Error("can only compare 2-3 products at a time");
            }

            const products = await this.findProductsByName(productNames)

            if(products.length < 2) {
                return {
                    phones: [],
                    differences: [],
                    recommendations: [`Error: Could not find the all the phones. Found: ${products.map(p => p.model).join(", ")}`]
                }
            }

            const differences = this.findDifferences(products);
            const recommendations = this.generateRecommendations(products);

            return {
                phones: products,
                differences: differences,
                recommendations: recommendations
            }

        } catch (error) {
            console.error('Exception in compareProducts:', error);
            return { 
                phones: [], 
                differences: [], 
                recommendations: ['Error comparing products. Please check the product names and try again.'] 
            };
        }
    }

    private static async findProductsByName(productNames: string[]): Promise<Phone[]> {
    const products: Phone[] = [];
    
    for (const productName of productNames) {
      const foundProduct = await this.findProductByName(productName);
      if (foundProduct) {
        products.push(foundProduct);
      }
    }
    
    return products;
  }

  private static async findProductByName(product: string): Promise<Phone | null> {
    const cleanedName = product.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();

    let{ data, error } = await supabase
    .from('phones')
    .select('*')
    .or(`model.ilike.%${cleanedName}%,brand.ilike.%${cleanedName}%`)
    .limit(1)

    if(error || !data || data.length === 0) {
        const words = cleanedName.split(' ');
        let query = supabase.from('phones').select('*')

        words.forEach(word => {
            if(word.length > 2) {
                query = query.or(`model.ilike.%${word}%,brand.ilike.%${word}%`)
            }
        })

        const {data: fuzzyData, error: fuzzyError } = await query.limit(1);

        if(fuzzyError || !fuzzyData || fuzzyData.length === 0) {
            return null;
        }

        return fuzzyData[0] as Phone
    }

    return data[0] as Phone
  }

  private static findDifferences(products: Phone[]): string[] {
    if(products.length < 2) {
        return [];
    }

    const differences: string[] = []
    const specsToCompare = ['price', 'screen_size', 'battery_capacity', 'ram', 'storage', 'main_camera_resolution']

    specsToCompare.forEach(spec => {
        const values = products.map((product, idx) => {
            const value = product.specs[spec];
            return `${product.brand} ${product.model}: ${value || 'N/A'}`;
        });

        const uniqueValues = new Set(products.map(p => p.specs[spec]))
        if(uniqueValues.size > 1) {
            differences.push(`${spec}: ${values.join(' | ')}`)
        }
    })

    const allFeatures = new Set(products.flatMap(p => p.features))
    allFeatures.forEach(feature => {
        const hasFeature = products.map(p => ({
            phone: `${p.brand} ${p.model}`,
            has: p.features.includes(feature)
        }));

        if(!hasFeature.every(p => p.has)) {
            const featureComparison = hasFeature.map(p => `${p.phone}: ${p.has ? '✓' : '✗'}`).join(' | ')
            differences.push(`${feature}: ${featureComparison} `)
        }
    })

    return differences;
  }

  private static generateRecommendations(products: Phone[]): string[] {
    const recommendations: string[] = [];

    const bestValue = this.findBestValue(products);
    if (bestValue) {
      recommendations.push(`💰 Best value: ${bestValue.brand} ${bestValue.model}`);
    }

    const bestCamera = this.findBestBySpec(products, 'main_camera_resolution');
    if (bestCamera) {
      recommendations.push(`📸 Best camera: ${bestCamera.brand} ${bestCamera.model} (${bestCamera.specs.main_camera_resolution}MP)`);
    }

    const bestBattery = this.findBestBySpec(products, 'battery_capacity');
    if (bestBattery) {
      recommendations.push(`🔋 Best battery: ${bestBattery.brand} ${bestBattery.model} (${bestBattery.specs.battery_capacity}mAh)`);
    }

    const bestRAM = this.findBestBySpec(products, 'ram');
    if (bestRAM) {
      recommendations.push(`⚡ Best performance: ${bestRAM.brand} ${bestRAM.model} (${bestRAM.specs.ram}GB RAM)`);
    }

    const bestScreen = this.findBestBySpec(products, 'screen_size');
    if (bestScreen) {
      recommendations.push(`📱 Largest screen: ${bestScreen.brand} ${bestScreen.model} (${bestScreen.specs.screen_size}" display)`);
    }

    const cheapest = products.reduce((min, p) => p.price < min.price ? p : min);
    recommendations.push(`💵 Budget option: ${cheapest.brand} ${cheapest.model} ($${cheapest.price})`);

    const mostExpensive = products.reduce((max, p) => p.price > max.price ? p : max);
    if (mostExpensive.id !== cheapest.id) {
      recommendations.push(`⭐ Premium option: ${mostExpensive.brand} ${mostExpensive.model} ($${mostExpensive.price})`);
    }

    return recommendations;
  }

  private static findBestValue(products: Phone[]): Phone | null {
    const scored = products.map(p => ({
      phone: p,
      score: (p.features.length + (p.specs.ram || 0) + (p.specs.storage || 0) / 128) / p.price
    }));

    scored.sort((a, b) => b.score - a.score);
    return scored[0]?.phone || null;
  }

  private static findBestBySpec(products: Phone[], specKey: string): Phone | null {
    const validProducts = products.filter(p => p.specs[specKey] != null && p.specs[specKey] > 0);
    if (validProducts.length === 0) return null;

    return validProducts.reduce((best, current) => {
      return current.specs[specKey] > best.specs[specKey] ? current : best;
    });
  }

}