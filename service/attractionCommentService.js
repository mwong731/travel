module.exports = class attractionComment {
   constructor(knex) {
      this.knex = knex;
      this.query = {
         selectUserCommentsWithUserName: this.knex.select("attractioncomment.id", "attractioncomment.userid", "users.name",
            "attractioncomment.attractionid ", "attractioncomment.comment", "attractioncomment.rate")
            .as("id", "userid", "name", "attractionid", "comment", "rate")
            .from("attractioncomment").innerJoin('users', 'users.id', 'attractioncomment.userid')
      }
   }

   listUserCommentsByUserID(UserID) {
      return this.knex.select("attractioncomment.id", "attractioncomment.userid", "users.name",
         "attractioncomment.attractionid ", "attractioncomment.comment", "attractioncomment.rate")
         .as("id", "userid", "name", "attractionid", "comment", "rate")
         .from("attractioncomment").innerJoin('users', 'users.id', 'attractioncomment.userid')

         .where("attractioncomment.userid", UserID);
   }

   listAttractionCommentsByAttractionID(AttractionID) {
      return this.knex.select("attractioncomment.id", "attractioncomment.userid", "users.name",
         "attractioncomment.attractionid ", "attractioncomment.comment", "attractioncomment.rate")
         .as("id", "userid", "name", "attractionid", "comment", "rate")
         .from("attractioncomment").innerJoin('users', 'users.id', 'attractioncomment.userid')

         .where("attractioncomment.attractionid", AttractionID);
   }

   insertComment(UserID, AttractionID, comment, Rate) {
      return this.knex('attractioncomment').insert([
         { userid: UserID, attractionid: AttractionID, comment: comment, rate: Rate }
      ]);
   }

   deleteComment(ID) {
      return this.knex('attractioncomment').where('id', ID).del();
   }

   updateCommentRateByID(ID, comment, Rate) {
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