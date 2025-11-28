import Exa from 'exa-js'

export class webSearchTool {
    private static exa = new Exa(process.env.EXA_API_KEY!)

    static async searchWeb(query: string): Promise<string> {
        try {
            const { results } = await this.exa.searchAndContents(query, {
                type: "auto",
                numResults: 3,
                summary: true
            })

            if(!results || results.length === 0) {
                return "No relevant information from search"
            }

            const formattedResults = results.map(result => `Title: ${result.title}\nhighlight: ${result.summary}\nurl: ${result.url}`).join("\n\n")

            return formattedResults;
        } catch (error) {
            console.error('Exa web search error:', error);
            return "Unable to search the web at the moment. Please try again later.";
        }
    }
}