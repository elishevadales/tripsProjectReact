

import axios from "axios";

export const API_URL = "http://localhost:3001"
export const TOKEN_NAME = "PLANTS_TOKEN"

export const doApiGet = async(_url) => {
  try{
    let resp = await axios.get(_url,{
      headers:{
        "x-api-key": localStorage[TOKEN_NAME]
      }
    })
    return resp;
  }
  catch(err){
    alert("something is wrong")
    throw err;

  }
}

// For Post,delete, put, patch
export const doApiMethod = async(_url,_method,_body = {}) => {
  try{

    let resp = await axios({
      url:_url,
      method:_method,
      data:_body,
      headers:{
        "x-api-key":localStorage[TOKEN_NAME]
      }
    })
    return resp;
  }
  catch(err){
    throw err;
  }
}

