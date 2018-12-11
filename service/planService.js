module.exports = class planService {
   constructor(knex) {
      this.knex = knex;
   }
   
   
   insertPlan( userId , name) {
      return this.knex('plan').insert([
         { userid: userId , name: name}
      ]).returning('id');
   }

   insertAttractioninplan(planId, attractionId, date ,Time) {
      return this.knex('attractioninplan').insert([
         { planid: planId, attractionid: attractionId, date:date , time:Time}
      ]);
   }

   deletePlanByID(ID) {
      return this.deleteAllAttractionInPlanByPlanID(ID).then(()=>{
         return this.knex('plan').where('id', ID).del();
      })
   }

   deleteAttractioninPlanByID(ID) {
      return this.knex('attractioninplan').where('id', ID).del();
   }

   deleteAllAttractionInPlanByPlanID(PlanID) {
      return this.knex('attractioninplan').where('planid',PlanID).del();
   }
   //below function not even test
}