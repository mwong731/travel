module.exports = class bookmarkService {

   constructor() {
      this.knex = knex;
   }

   insertBookmark(userID, attractionID) {
      return knex('bookmark').insert([
         { userid: userID, attractionid: attractionID }
      ]);
   }

   deleteBookmark(attractionID) {
      return knex('bookmark').where('id', attractionID).del();
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

}