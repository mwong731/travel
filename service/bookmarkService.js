module.exports = class bookmarkService {
   //finish test
   constructor(knex) {
      this.knex = knex;
   }

   insertBookmark(userID, attractionID) {
         console.log("insert", userID,attractionID)
      return this.knex('bookmark').insert([
         { userid: userID, attractionid: attractionID }
      ]);
   }

   deleteBookmark(userID, attractionID) {
      return this.knex('bookmark').where({ userid: userID, attractionid: attractionID }).del();
   }

   listUserBookmark(userID) {
      return this.knex.select("userid", "attractionid")
         .from("bookmark")
         .where("userid", userID);
   }

   countAttractionBookmark(attractionID) {
      return this.knex.count("id")
         .from("bookmark")
         .where("attractionid", attractionID);
   }
   //below function not even test
}