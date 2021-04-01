const parse = require('pg-connection-string').parse;
const config = parse(process.env.DATABASE_URL);
const hasConnectionURL = !!process.env.DATABASE_URL;

module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: hasConnectionURL ? config.host : env('DATABASE_HOST', '127.0.0.1'),
        port: hasConnectionURL ? config.port : env.int('DATABASE_PORT', 5432),
        database: hasConnectionURL ? config.database : env('DATABASE_NAME', 'plus-edu'),
        username: hasConnectionURL ? config.user : env('DATABASE_USERNAME', 'postgres'),
        password: hasConnectionURL ? config.password : env('DATABASE_PASSWORD', 'root'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {}
    },
  },
});
