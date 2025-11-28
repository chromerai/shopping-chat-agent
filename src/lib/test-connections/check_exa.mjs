import Exa from 'exa-js';
const exa = new Exa(process.env.EXA_API_KEY);

const result = await exa.searchAndContents(
  "Explain EIS vs OIS",
  {
    numResults: 3,
    summary: true
  }
);

// print the first result
console.log(result.results[0]);