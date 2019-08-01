const monk = require('monk');

const database = monk('localhost/FullStack');

module.exports = database ;