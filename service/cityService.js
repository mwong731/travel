module.exports = class cityService {
    constructor(knex) {
       this.knex = knex;
       this.cityId=null;
    }

    getCity(cityName){
        let object={}

        return this.knex.select("id", "name", "description","image")
          .from("city")
          .where("name", cityName)
          .then((data)=> {
              if(data.length>0){
              object.id=data[0].id;
              object.name=data[0].name;
              object.description=data[0].description;
              object.image=data[0].image;
              return object;
            }else{
                return {error:'this city does not exist'}
            }

            })

    }

    getAttraction(cityName){
        return this.knex.select("*")
        .from("city")
        .where("name", cityName)
        .then((data)=> {
            // console.log("getAttraction",cityName)
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


 

 