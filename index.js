const getRandomWikidata = require("./src/queryWikidata");
const getRandomGoogle = require("./src/queryGoogleKG");
const publishToODN = require("./src/queryOTNode");
require("dotenv").config();

const queryTypes = [
  {
    name: "wikidata",
    getData: () => getRandomWikidata,
    filepath: "datasets/wikidata.json",
  },
  {
    name: "google",
    getData: () => getRandomGoogle,
    filepath: "datasets/google.json",
  },
];

const publish = async () => {
  const randomQuery = queryTypes[Math.random() * (queryTypes.length - 1)];
  console.log(`About to publish dataset taken from ${randomQuery.name}`);
  randomQuery
    .getData()
    .then(async ({ assets, keywords }) => {
      await publishToODN(assets, keywords, googleDataset);
      publish();
    })
    .catch((error) => console.log(`Error : ${error}`));
};
publish();
