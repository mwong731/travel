
module.exports = class AttractionService {
    //not done!!
    //need add upload image function 
    constructor(knex) {
        this.knex = knex;
        this.query = {
            selectAttraction: this.knex.select("cityid", "name", "description", "type ", "latitude ", "longitude ", "image")
                .from("attraction")
        }
    }

    listAttractionInCityID(cityID) {
        return this.knex.select("cityid", "name", "description", "type ", "latitude ", "longitude ", "image")
            .from("attraction")
            .where("cityid", cityID);
    }

    //no use
    listAttraction() {
        return this.knex.select("cityid", "name", "description", "type ", "latitude ", "longitude ", "image")
            .from("attraction")
    }

    getAttractionInAttractionID(attractionID) {
        return this.knex.select("cityid", "name", "description", "type ", "latitude ", "longitude ", "image")
            .from("attraction")
            .where("id", attractionID);
    }

    getAttractionByCityID(cityID) {
        return this.knex.select("cityid", "name", "description", "type ", "latitude ", "longitude ", "image")
            .from("attraction")
            .where("cityid", cityID);
    }

    // updateAttractionWithID input can be null
    updateAttractionWithID(attractionID, cityid, name, description, type, latitude, longitude, image) {
        let insertObject = new Object();
        if (cityid != null) {
            insertObject.cityid = cityid;
        }
        if (name != null) {
            insertObject.name = name;
        }
        if (description != null) {
            insertObject.description = description;
        }
        if (type != null) {
            insertObject.type = type;
        }
        if (latitude != null) {
            insertObject.latitude = latitude;
        }
        if (longitude != null) {
            insertObject.longitude = longitude;
        }
        if (image != null) {
            insertObject.image = image;
        }
        return this.knex('attraction').update(insertObject).where("id", attractionID).catch((err) => {
            console.log(err);
        });
    }

    deleteAttraction(attractionID) {
        //this.knex('bookmark').where('attractionid', attractionID).del();
        return this.knex('bookmark').where('attractionid', attractionID).del().then(() => {
            return this.knex('attractioncomment').where('attractionid', attractionID).del();
        }).then(() => {
            return this.knex('attractioninplan').where('attractionid', attractionID).del();
        }).then(() => {
            return this.knex('attraction').where('id', attractionID).del();
        }).catch((err) => {
            console.log(err);
        })
    }
    // insert() input(latitude , longitude) can be null
    insert(cityid, type, name, latitude, longitude, image) {
        return this.knex('attraction').insert([
            { cityid: cityid, name: name, type: type, latitude: latitude, longitude: longitude, image: image }
        ]);
    }
    //below function not even test
}