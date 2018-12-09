module.exports = class cityService {
    constructor(knex) {
       this.knex = knex;
    }

    getCity(cityName){
        let object={
            id:'',
            name: '',
            description: '',
            attraction:''
        }

        return this.knex.select("id", "name", "description")
          .from("city")
          .where("name", cityName)
          .then((data)=> {
              object.id=data[0].id;
              object.name=data[0].name;
              object.description=data[0].description;
              return data[0].id;
            })
            .then((cityId)=>{
                return this.knex.select()
                .from("attraction")
                // testing with 1
                // .where("cityid", 1)
                .where("cityid", cityId)
                .then((result)=>{
                    object.attraction=result;
                    return object
                })

            })

    }
 
    
 
 }