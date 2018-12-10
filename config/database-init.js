
module.exports = {
   knex : require('knex')({
      client: 'postgresql',
      connection: {
         database: "test2",
         user: "postgres",
         password: "postgres"
      }
   })
}