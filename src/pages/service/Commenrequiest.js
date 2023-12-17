// import axios libery

import axios from "axios";

export const commonReqest = async (method, url, body) => {
  let reqConfig = {
    method,
    url,
    body,
    headers: { "content-type": "application/json" },
  };
  console.log(reqConfig);


  return await axios(reqConfig)
    .then((response) => {
        
      return response;
    })
    .catch((err) => {
       
      return err;
    });
};
