const snowflake = require('snowflake-sdk');

// Lazy connection — created only when connectSnowflake() is first called
let connection = null;

// Connect and export
const connectSnowflake = () => {
  if (!connection) {
    connection = snowflake.createConnection({
      account:      process.env.SNOWFLAKE_ACCOUNT,
      username:     process.env.SNOWFLAKE_USER,
      password:     process.env.SNOWFLAKE_PASSWORD,
      database:     process.env.SNOWFLAKE_DATABASE,
      schema:       process.env.SNOWFLAKE_SCHEMA,
      warehouse:    process.env.SNOWFLAKE_WAREHOUSE,
      role:         process.env.SNOWFLAKE_ROLE,
      loginTimeout: 8,
    });
  }
  return new Promise((resolve, reject) => {
    connection.connect((err, conn) => {
      if (err) {
        console.error('❌ Snowflake connection failed:', err.message);
        reject(err);
      } else {
        console.log('✅ Snowflake connected — ID:', conn.getId());
        resolve(conn);
      }
    });
  });
};

// Execute a query and return rows as promise
const executeQuery = (sqlText, binds = []) => {
  return new Promise((resolve, reject) => {
    connection.execute({
      sqlText,
      binds,
      complete: (err, stmt, rows) => {
        if (err) {
          console.error('Snowflake query error:', err.message);
          console.error('Query:', sqlText);
          reject(err);
        } else {
          resolve(rows);
        }
      }
    });
  });
};

module.exports = { connection, connectSnowflake, executeQuery };