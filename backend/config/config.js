module.exports = {
  "development": {
    "username": process.env.PG_USERNAME,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DATABASE,
    "host": process.env.PG_URL,
    "dialect": "postgres",
    "port": 5433,
    "schema": "public"
  },
  "test": {
    "username": process.env.PG_USERNAME,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DATABASE,
    "host": process.env.PG_URL,
    "dialect": "postgres",
    "port": 5433,
    "schema": "public"
  },
  "production": {
    "username": process.env.PG_USERNAME,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DATABASE,
    "host": process.env.PG_URL,
    "dialect": "postgres",
    "port": 5433,
    "schema": "public"
  }
}

// "username": 'postgres',
//     "password": "9151",
//     "database": "letsdb",
//     "host": "localhost",
//     "dialect": "postgres",
//     "port": 5433,
//     "schema": "public"