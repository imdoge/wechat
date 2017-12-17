var config = {
  // node配置
  'listen_port': 3333,
  'session_secret': 'NUqIVqRtS0NmOTaq3TAh-vzzXWiMgQbQ',
  'session_max_age': 24 * 60 * 60 * 1000,
  'rate_limit_ms': 60 * 60 * 1000,
  'rate_limit': 5000,

  // mysql配置
  'mysql_host': 'localhost',
  'mysql_port': 3306,
  'mysql_user': 'root',
  'mysql_password': '',
  'mysql_db': 'database',

  //redis配置
  'redis_host': 'localhost',
  'redis_port': 6379,
  'redis_password': '',
  'redis_db': 0
};

module.exports = config;
