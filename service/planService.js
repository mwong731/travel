module.exports = class planService{
   constructor(){
      this.knex = require('knex')({
         client: 'postgresql',
         connection: {
            database: "test1",
            user: "dereklin",
            password: ""
         }
      });
   }
   
   insertPlan(ID, userID) {
      return knex('attractioncomment').insert([
         { id: ID, userid : userID}
      ]);
   }


}