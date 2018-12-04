
module.exports = class AttractionService {

    constructor() {
        this.knex = require('knex')({
            client: 'postgresql',
            connection: {
                database: "test1",
                user: "dereklin",
                password: ""
            }
        });
    }

    listAttractionInCityID(cityID) {
        return this.knex.select("id", "cityid", "type ", "latitude ", "longitude ", "image")
            .from("attraction")
            .where("cityid", cityID);
    }

    getAttractionInAttractionID(attractionID) {
        return this.knex.select("id", "cityid", "type ", "latitude ", "longitude ", "image")
            .from("attraction")
            .where("id", attractionID);
    }

    updateAttractionWithID(attractionID, cityid, type, latitude, longitude, image) {
        let insertObject = new Object();
        if (cityid != null) {
            insertObject.cityid = cityid;
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
        return this.knex('attraction').update(insertObject).where("id", attractionID);
    }

    deleteAttraction(attractionID) {
        return knex('attraction').where('id', attractionID).del();
    }

    insert(cityid, type, latitude, longitude, image) {
        return knex('attraction').insert([
            { cityid: cityid, type: type, latitude: latitude, longitude: longitude, image: image }
        ]);
    }
}