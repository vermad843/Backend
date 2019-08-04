const monk = require('monk');

const db = monk('localhost/FullStack');

module.exports = db ;