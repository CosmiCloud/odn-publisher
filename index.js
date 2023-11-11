require("dotenv").config();
const axios = require("axios");
const api_key = process.env.OTHUB_API_KEY;
const { setTimeout } = require("timers/promises");
//const { publish, get } = require("./src/apis/OTNode");
const apis = require("./src/util/apis");

//const logPrettyJSON = (data) => console.log(JSON.stringify(data, null, 2));

const config = {
  headers: {
    "X-API-Key": api_key,
  },
};

(async () => {
  while (true) {
    for (const api of apis) {
      console.log(`About to publish dataset taken from ${api.name}`);

      // fetch data
      const asset_data = await api.getData();
      //const data = await api.getData();
      
      const data = {
        network: "otp::testnet",
        epochs: 1,
        receiver: "0x0EFA0c78aA0E5CB851E909614c22C98E68dd882d",
        asset: asset_data
      };

      // // create asset
      // const publishResult = await publish(data);
      // logPrettyJSON(publishResult)

      const response = await axios
        .post(`https://api.othub.io/dkg/create_n_transfer`, data, config)
        .then((response) => {
          // Handle the successful response here
          return response;
        })
        .catch((error) => {
          // Handle errors here
          console.error(error);
        });

      //   const response = await axios
      //   .post(`http://localhost:5575/dkg/create_n_transfer`, data, config)
      //   .then((response) => {
      //     // Handle the successful response here
      //     return response;
      //   })
      //   .catch((error) => {
      //     // Handle errors here
      //     console.error(error);
      //   });

       console.log(response);

      // get asset
      // if (publishResult?.operation?.status === "COMPLETED") {
      //   const getResult = await get(publishResult.UAL);
      //   logPrettyJSON(getResult);
      // }

      // sleep 5 seconds
      await setTimeout(5 * 1000);
    }
  }
})();
