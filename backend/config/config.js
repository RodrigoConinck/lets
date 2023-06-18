module.exports = {
  "development": {
    "username": process.env.PG_USERNAME,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DATABASE,
    "host": process.env.PG_URL,
    "dialect": "postgres",
    "port": process.env.PG_PORT,
    "schema": "public"
  },
  "test": {
    "username": process.env.PG_USERNAME,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DATABASE,
    "host": process.env.PG_URL,
    "dialect": "postgres",
    "port": process.env.PG_PORT,
    "schema": "public"
  },
  "production": {
    "username": process.env.PG_USERNAME,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DATABASE,
    "host": process.env.PG_URL,
    "dialect": "postgres",
    "port": process.env.PG_PORT,
    "schema": "public"
  }
}