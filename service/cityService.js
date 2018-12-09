module.exports = class cityService {
    constructor(knex) {
       this.knex = knex;
       this.cityId=null;
    }

    getCity(cityName){
        let object={
            id:'',
            name: '',
            description: ''
        }

        return this.knex.select("id", "name", "description")
          .from("city")
          .where("name", cityName)
          .then((data)=> {
              object.id=data[0].id;
              object.name=data[0].name;
              object.description=data[0].description;
              return object;
            })

    }

    getAttraction(cityName){
        return this.knex.select("id")
        .from("city")
        .where("name", cityName)
        .then((data)=> {
            // console.log("cityNamae",cityName)
            this.cityId=data[0].id;
            return data
        })
          .then((cityId)=>{
              return this.knex.select()
              .from("attraction")
              .where("cityid", cityId[0].id)
              .then((result)=>{
                  return result
              })

          })

    }

    filter(data){
        return this.knex.select()
          .from("attraction")
          .where({
            type: data.type,
            cityid:  this.cityId
          })
          .then((data)=> {
              return data
            })
    }

 
    
 
 }


 

 