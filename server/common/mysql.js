var mysql     =    require('mysql');
var config    =    require('../config');

var pool      =    mysql.createPool({
    connectionLimit : 100,
    host     : config.mysql_host,
    port     : config.mysql_port,
    user     : config.mysql_user || 'root',
    password : config.mysql_password || '',
    database : config.mysql_db
});

module.exports = pool;