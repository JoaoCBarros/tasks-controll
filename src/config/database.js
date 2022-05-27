require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

module.exports = {
  host: '127.0.0.1',
  port: '5433',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || 'postgres',
  storage: './test/database.sqlite',
  //operatorsAliases: false,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscored_all: true,
  }
}