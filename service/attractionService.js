
module.exports = class AttractionService {
    //not done!!
    //need add upload image function 
    constructor(knex) {
        this.knex = knex;
        this.query = {
            selectAttraction: this.knex.select("*")
                .from("attraction")
                .where("confirmstatus", "accept")
        }
    }

    listAttractionInCityID(cityID) {
        return this.knex.select("*")
            .from("attraction")
            .where("confirmstatus", "accept")
            .andWhere("cityid", cityID);
    }

    //no use
    listAttraction() {
        return this.knex.select("*")
            .from("attraction")
            .where("confirmstatus", "accept");
    }

    getAttractionInAttractionID(attractionID) {
        return this.knex.select("*")
            .from("attraction")
            .where("confirmstatus", "accept")
            .andWhere("id", attractionID);

        ;
    }

    getImageAttractionByAttractionID(attractionID) {
        return this.knex.select("id", "attractionid", "image")
            .from("attractionimage")
            .where("attractionid", attractionID);
    }



    getAttractionInAttractionID(attractionID) {
        return this.knex.select("*")
            .from("attraction")
            .where("confirmstatus", "accept")
            .andWhere("id", attractionID);
    }

    getAttractionByCityID(cityID) {
        return this.knex.select("*")
            .from("attraction")
            .where("confirmstatus", "accept")
            .andWhere("cityid", cityID);
    }

    getCityNameByAttractionID(AttractionID) {
        return this.knex.select("*")
            .from("attraction")
            .where("attractionid", AttractionID)
            .andWhere("cityid", cityID);
    }

    // updateAttractionWithID input can be null
    updateAttractionWithID(attractionID, cityid, name, description, type, latitude, longitude, confirmstatus ,icon) {
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
    insert(cityid, userid, type, name, latitude, longitude , icon) {
        return this.knex('attraction').insert([
            { cityid: cityid, userid: userid, name: name, type: type, latitude: latitude, longitude: longitude, confirmstatus: "wait" ,icon:icon}
        ]);
    }
    //below function not even test
}