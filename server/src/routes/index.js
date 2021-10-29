const fs = require('fs');
const path = require('path');

let routes = {};

fs.readdirSync(__dirname).forEach((routeFileName) => {
  const routeName = routeFileName.slice(0, routeFileName.indexOf('.'));
  routes[routeName] = require(path.join(__dirname, routeFileName));
});

module.exports = routes;
