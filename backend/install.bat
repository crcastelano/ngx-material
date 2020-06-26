cd \code\github
git clone https://github.com/crcastelano/angular-node-graphql-postgraphile.git
cd angular-node-graphql-postgraphile\
md backend
md frontend
cd backend
npm init -y
npm install postgraphile
npm install express
npm install body-parser
npm install cors
npm install pg
npm i nodemon dotenv -D
npm install @graphile-contrib/pg-simplify-inflector

# acrescentar no package.json
# "start": "node src/index.js", 

# executar o graphile manualmente
# postgraphile -c "postgres://postgres:root@localhost:5432/gesttore?-s public -a -j"


# frontend
npm install apollo-angular apollo-angular-link-http apollo-client apollo-cache-inmemory graphql-tag graphql