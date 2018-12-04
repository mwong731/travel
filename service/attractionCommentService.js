module.exports = class attractionComment {
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

   listUserCommentsByUserID(UserID) {
      return this.knex.select("id", "userid", "attractionid ", "comment", "rate")
         .from("attractioncomment")
         .where("userid", UserID);
   }

   listAttractionCommentsByAttractionID(AttractionID) {
      return this.knex.select("id", "userid", "attractionid ", "comment", "rate")
         .from("attractioncomment")
         .where("attractionid", AttractionID);
   }

   insertComment(UserID, AttractionID, comment, Rate) {
      return knex('attractioncomment').insert([
         { userid: UserID, attractionid: AttractionID, comment: comment, rate: Rate }
      ]);
   }

   deleteComment(ID) {
      return knex('attractioncomment').where('id', ID).del();
   }

   updateCommentRateByID( ID,comment , Rate) {
      let updateObject = new Object();
      if (comment != null) {
         updateObject.comment = comment;
      }
      if (Rate != null) {
         updateObject.rate = Rate;
      }
      return this.knex('attractioncomment').update(updateObject).where("id", ID);
   }

}