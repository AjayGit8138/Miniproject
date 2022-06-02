const nano = require('nano');
const url = "https://apikey-v2-qnl37sqy0oqwj8owtrhj6kam3p39wzmc0d46oflhvln:cb14c8c9976ced0867c79d8eb625505a@a1b21745-8512-41b2-8506-c83a13a27993-bluemix.cloudant.com";
const nanodb = nano(process.env.COUCHDB_URL || url);
const hospitaldb = nanodb.use('hospital_admission');

module.exports = {hospitaldb}