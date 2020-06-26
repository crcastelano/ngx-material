const { postgraphile } = require('postgraphile')
const PgSimplifyInflectorPlugin = require('@graphile-contrib/pg-simplify-inflector');

const { DATABASE, PG_USER, PASSWORD, HOST, PG_PORT } = process.env
console.log('Data: ' + DATABASE)
module.exports = postgraphile(
    {
        database: DATABASE,
        user: PG_USER,
        password: PASSWORD,
        host: HOST,
        port: PG_PORT,
    },
    'public',
    {
        appendPlugins: [PgSimplifyInflectorPlugin],
        watchPg: true,
        graphiql: true,
        enhanceGraphiql: true,
    }
)