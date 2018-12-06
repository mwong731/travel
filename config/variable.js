let attractionType = { shop: "shop", restaurant: "restaurant", sleep: "sleep", go: "go" };
let Confirmstatus = { accept: "accept", decline: "decline", wait: "wait" };
let Usertype = { user: "user", admin: "admin" };
let Gender = { male: "Male", famale: "Female" };
let Time = { day: "day", night: "night" };
module.exports = {
   attraction: {
      type: attractionType
   },
   userSubmitAttraction: {
      type: attractionType,
      confirmstatus: Confirmstatus
   },
   attractioninplan: {
      time: Time
   },
   users: {
      usertype: Usertype,
      gender: Gender
   }
}