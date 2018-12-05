
module.exports = {
   knex : require('knex')({
      client: 'postgresql',
      connection: {
         database: "test1",
         user: "dereklin",
         password: ""
      }
   })
}