const request = require("postman-request");

const whetherinfo = (lat, long, callback) => {
  const url = ` http://api.weatherstack.com/current?access_key=ee5eb9fb90e48820732eb1259c251162&query=${lat},${long}  `;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Network Issue", undefined);
    } else if (body.error) {
      callback("Kindly provide coordinates", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]} . It is currently ${body.current.temperature} degree out  . It feels like ${body.current.feelslike} degree .`
      );
    }
  });
};

module.exports = whetherinfo;
