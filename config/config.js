module.exports = {
  development: {
    username: 'states',
    password: 'states',
    database: 'states',
    host: '127.0.0.1',
    dialect: 'postgres', // or mysql, sqlite, mssql etc.
  },
  test: {
    username: 'usuario_test',
    password: 'password_test',
    database: 'base_de_datos_test',
    host: '127.0.0.1',
    dialect: 'postgres', // or mysql, sqlite, mssql etc.
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres', // or mysql, sqlite, mssql etc.
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
