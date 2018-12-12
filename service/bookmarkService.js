module.exports = class bookmarkService {
   //finish test
   constructor(knex) {
      this.knex = knex;
   }
   // Select
   listUserBookmark(userID) {
      return this.knex.select("userid", "attractionid")
         .from("bookmark")
         .where("userid", userID)
         .orderBy('id', 'desc');
   }

   getUserBookmarkWithUserIDAndAttractionID(userID, attractionID) {
      return this.knex.select("userid", "attractionid")
         .from("bookmark")
         .where("userid", userID)
         .andWhere("attractionid", attractionID);
   }

   countAttractionBookmark(attractionID) {
      return this.knex.count("id")
         .from("bookmark")
         .where("attractionid", attractionID);
   }
   // Insert
   insertBookmark(userID, attractionID) {
      console.log("insert", userID, attractionID)
      return this.knex('bookmark').insert([
         { userid: userID, attractionid: attractionID }
      ]);
   }
   // Delete
   deleteBookmark(userID, attractionID) {
      return this.knex('bookmark').where({ userid: userID, attractionid: attractionID }).del();
   }
}