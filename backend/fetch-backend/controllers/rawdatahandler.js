const fetch = require("node-fetch");

const redis = require("redis");

redisClient = redis.createClient(process.env.REDIS_URI);

//currency handler

const getCurrencyConversion = rawDataComponent => {
  fetch(process.env.DATA_CONVERSION_URI)
    .then(response => response.json())

    .then(data => {
      console.log(data);

      rawDataComponent.lastCurrency = data.USD_IDR;

      return rawDataComponent;
    });
};

const updateCurrencyConversion = rawDataComponent => {
  //will get conversion data if needed

  let deltaTime = Number((new Date() - rawDataComponent.previousHit) / 3600.0);

  if (!rawDataComponent.lastCurrency) {
    rawDataComponent.previousHit = new Date();

    return getCurrencyConversion(rawDataComponent);
  } else if (deltaTime > 10.0) {
    rawDataComponent.previousHit = new Date();

    return getCurrencyConversion(rawDataComponent);
  }
};

//overall data handler

const getDataHandler = (req, res, rawDataComponent) => {
  let { authorization } = req.headers;
  let callbackData;
  //check client authorization
  if (authorization) {
    redisClient.get(authorization, async (err, callback) => {
      console.log(callback);
      callbackData = await JSON.parse(callback);
      if (callbackData.role.toLowerCase !== "admin") {
        updateCurrencyConversion(rawDataComponent);
      }
    }  
    )
  }

  fetch(process.env.DATA_SOURCE_URI)
    .then(response => response.json())
    .then(data => {
      if(callbackData.role.toLowerCase() !== "admin"){
        //other role
        res.json(otherDataProcessing(data, rawDataComponent.lastCurrency))
      }else{
        res.json(adminDataProcessing(data))
      }
    })
};

//role data processing

const adminDataProcessing = data => {
  //to save final value
  let aggregateValue = [];
  let aggregateIndex = 0;
  let prevValue;
  //to save same value every raw
  let tempArray= [];
  let tempIndex = 0;
  let tempSum = 0;

  //preprocessing data, remove null
  let filteredData = data.filter(rawData => rawData.area_provinsi)
  prevValue = filteredData[0]
  delete filteredData[0]

  filteredData.map(rawData  => {
    // delete rawData.uuid;
    // delete rawData.timestamp;
    if(rawData.area_provinsi !== prevValue.area_provinsi){
      //initiate object
      let newEntry = prevValue;
      let length = tempArray.length;
      if(length>0){
        tempArray.sort((d1,d2)=>d1.price-d2.price)
        let median = 0;
        let medianIndex = 0;
        if(length%2 === 0){
          medianIndex = Math.ceil((length/2) + (1+(length/2))/length);
          median = tempArray[medianIndex]
        }else{
          medianIndex = Math.floor(length/2)+1;
          median = tempArray[Math.floor(length/2)+1]
        }
        
        try{newEntry.min = tempArray[length-1].price}catch(err){newEntry.min = null}
        try{newEntry.max = tempArray[0].price}catch(err){newEntry.max = null}
        try{newEntry.median = median.price}catch(err){newEntry.median = null}
        newEntry.mean = tempSum/length;
        newEntry.medianIndex = medianIndex
        newEntry.batch = length
      }else{
        try{newEntry.min = prevValue.price}catch(err){newEntry.min = null}
        try{newEntry.max = prevValue.price}catch(err){newEntry.max = null}
        try{newEntry.median = prevValue.price}catch(err){newEntry.median = null}
        newEntry.mean = prevValue.price;
        newEntry.medianIndex = null
        newEntry.batch = null
      }

      aggregateValue[aggregateIndex] = newEntry;
      aggregateIndex += 1;

      //clear temp value
      tempArray = [];
      tempIndex = 0;
      tempSum = 0;
    }else{
      tempArray[tempIndex] = prevValue;
      tempIndex += 1;
      tempSum += Number(prevValue.price)
    }

    prevValue = rawData;
  });
  return aggregateValue;
};

const otherDataProcessing = (data, conversionCurrency) => {
  let filteredData = data.filter(filteredData => filteredData.area_provinsi)
  filteredData.map(rawData => {
    rawData.USDPrice = Number(rawData.price) / Number(conversionCurrency);
  });
  return filteredData;
};

module.exports = {
  getDataHandler: getDataHandler,
  updateCurrencyConversion: updateCurrencyConversion
};
