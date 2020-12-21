const request = require("request");

const foreCast = (lat, lon, callBack) => {
  const url =
    " https://api.weatherbit.io/v2.0/current?&lat=" +
    lat +
    " &lon=" +
    lon +
    "&key=39aa8352ed60495eb4573a1f5c720147";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callBack("Unable to connect to the internet", undefined);
    } else if (body.error) {
      callBack("Unable to find the location", undefined);
    } else {
      callBack(
        undefined,
        `${body.data[0].weather.description}. It is currently ${body.data[0].temp}. There is ${body.data[0].precip} % chance of rainfall.The windspeed is ${body.data[0].wind_spd}. The sun will set at ${body.data[0].sunset} PM`
      );
    }
  });
};

module.exports = foreCast;
