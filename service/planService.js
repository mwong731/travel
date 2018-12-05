module.exports = class planService {
   constructor() {
      this.knex = knex;
   }
   
   insertPlan(ID, userID) {
      return knex('plan').insert([
         { id: ID, userid: userID }
      ]);
   }

   // need change
   insertAttractioninplan(planID, attractionID) {
      //need modify later 
      return knex('plan').insert([
         { planid: planID, attractionid: attractionID }
      ]);
   }

   deletePlanByID(ID) {
      return new Promise((resolve, reject) => {
         deleteAllAttractionInPlanByPlanID(PlanID).then(()=>{
            knex('plan').where('id', ID).del();
         });
         resolve();
      });
   }

   deleteAttractioninPlanByPlanID(ID) {
      //need modify later 
      return knex('attractioninplan').where('id', ID).del();
   }

   deleteAllAttractionInPlanByPlanID(PlanID) {
      //need modify later 
      return knex('attractioninplan').where('planid', PlanID).del();
   }


}