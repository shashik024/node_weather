const request = require("postman-request");

const geocoder = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/encodeURIComponent(${address}).json?access_token=pk.eyJ1Ijoic2hhc2hpMDI0IiwiYSI6ImNrcDVjdGNieDAwaXAydm9mOWFmeTBiNHoifQ.JH9vwuorWvHtTcR9obZJlw&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    // console.log(error);

    if (error) {
      callback("Network issue", undefined);
    } else if (body.features.length === 0) {
      callback("kindly provide location", undefined);
    } else if (body.message) {
      callback("Provide Correct location name", undefined);
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        long: body.features[0].center[0],
        lat: body.features[0].center[1],
      });
    }
  });
};

module.exports = geocoder;
