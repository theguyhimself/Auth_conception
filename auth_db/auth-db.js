
var db_connection = require('./sqlite_connection');

var user_dao = require('./user_dao');
var battle_dao = require('./battle_dao');

module.exports = {db: db_connection, user_dao: user_dao,battle_dao: battle_dao};

