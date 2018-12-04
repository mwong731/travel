module.exports = class planService {
   constructor() {
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
      return knex('plan').insert([
         { id: ID, userid: userID }
      ]);
   }

   insertAttractioninplan(planID, attractionID) {
      //need modify later 
      return knex('plan').insert([
         { planid: planID, attractionid: attractionID }
      ]);
   }

   deleteCommentByID(ID) {
      return new Promise((resolve, reject) => {
         knex('plan').where('id', ID).del();
         
         resolve();
      });
      
   }

   deleteAttractioninplanByID(ID) {
      //need modify later 
      return knex('attractioninplan').where('id', ID).del();
   }


}