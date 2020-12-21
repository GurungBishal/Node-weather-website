const request = require("request");

const geoCode = (address, callBack) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiaXRhY2hpZ3VydW5nMDAiLCJhIjoiY2tpcmFscmFxMDh6MDJxc2MydTVlNngxNCJ9.JF6Q7H7pAg20yvZXwhZcjg&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callBack("Unable to connect to the location services", undefined);
    } else if (body.features.length === 0) {
      callBack("Unable to find location. Please try again", undefined);
    } else {
      callBack(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
