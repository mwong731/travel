
module.exports = class AttractionService {
    //need add upload image function 
    constructor(knex) {
        this.knex = knex;
        this.query = {
            selectAttraction: this.knex.select("*")
                .from("attraction")
                .where("confirmstatus", "accept")
        }
    }
    // Select

    //no use
    listAttraction() {
        return this.knex.select("*")
            .from("attraction")
            .where("confirmstatus", "accept");
    }

    listAttractionInCityID(cityID) {
        return this.knex.select("*")
            .from("attraction")
            .where("confirmstatus", "accept")
            .andWhere("cityid", cityID);
    }
    // Don't use this method, use listAttractionInCityID(cityID)^^
    getAttractionByCityID(cityID) {
        return this.knex.select("*")
            .from("attraction")
            .where("confirmstatus", "accept")
            .andWhere("cityid", cityID);
    }

    getAttractionByCityName(cityName) {
        return this.knex.select("*")
            .from("city")
            .where("name", cityName)
            .then((data) => {
                // console.log("getAttraction",cityName)
                this.cityId = data[0].id;
                return data
            })
            .then((cityId) => {
                return this.knex.select()
                    .from("attraction")
                    .where("cityid", cityId[0].id)
                    .then((result) => {
                        return result
                    })

            })

    }

    getAttractionInAttractionID(attractionID) {
        return this.knex.select("*")
            .from("attraction")
            .where("confirmstatus", "accept")
            .andWhere("id", attractionID);
    }


    getImageAttractionByAttractionID(attractionID) {
        return this.knex.select("id", "attractionid", "image")
            .from("attractionimage")
            .where("attractionid", attractionID);
    }
    // need add
    getCityByAttractionID(AttractionID) {
        return this.knex.select("*")
            .from("attraction")
            .where("attractionid", AttractionID)
            .andWhere("cityid", cityID);
    }
    // Insert
    // insert() input(latitude , longitude) can be null
    insert(cityid, name, type, latitude, longitude, icon, description, userid) {
        console.log("insertin", cityid, name, type, latitude, longitude, icon, description, userid)
        return this.knex('attraction').insert(
            { cityid: cityid, name: name, type: type, latitude: latitude, longitude: longitude, description: description, confirmstatus: "wait", userid: userid ,icon:icon}
        );
    }
    insertAttraction(cityid, name, type, latitude, longitude, image, description, userid) {
        console.log("insertin", cityid, name, type, latitude, longitude, image, description, userid)
        return this.knex('attraction').insert(
            
            { cityid: cityid, name: name, type: type, latitude: latitude, longitude: longitude, description: description, confirmstatus: "wait", userid: userid }
        );
    }
    // Update
    // updateAttractionWithID input can be null
    updateAttractionWithID(attractionID, cityid, name, description, type, latitude, longitude, confirmstatus, icon) {
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
        if (confirmstatus != null) {
            insertObject.confirmstatus = confirmstatus;
        }
        if (icon != null) {
            insertObject.icon = icon;
        }
        return this.knex('attraction').update(insertObject).where("id", attractionID).catch((err) => {
            console.log( err);
        });
    }
    // Delete
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


}