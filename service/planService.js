module.exports = class planService {
   constructor(knex) {
      this.knex = knex;
   }
   
   insertPlan( userID , Name) {
      return this.knex('plan').insert([
         { userid: userID , name: Name}
      ]);
   }

   insertAttractioninplan(planID, attractionID , date ,Time) {
      return this.knex('attractioninplan').insert([
         { planid: planID, attractionid: attractionID , date:date , time:Time}
      ]);
   }

   deletePlanByID(ID) {
      return deleteAllAttractionInPlanByPlanID(ID).then(()=>{
         return this.knex('plan').where('id', ID).del();
      })
   }

   deleteAttractioninPlanByID(ID) {
      return this.knex('attractioninplan').where('id', ID).del();
   }

   deleteAllAttractionInPlanByPlanID(PlanID) {
      return this.knex('attractioninplan').where('planid',PlanID).del();
   }

}