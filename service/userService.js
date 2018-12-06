module.exports = class UserService {
   constructor(knex) {
      this.knex = knex;
   }
   insertUser(Email, Password, FacebookID, GoogleID , Name, Gender , Birthday ,Usertype) {
      return this.knex('users').insert([
         { email: Email, password: Password, facebookid:FacebookID , googleid:GoogleID ,name: Name, gender:Gender , birthday:Birthday ,usertype: Usertype }
      ]);
   }
}