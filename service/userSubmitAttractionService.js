

module.exports = class UserSubmitAttractionService {
    constructor(knex) {
        this.knex = knex;
    }

    getAttractionByAttractionID(attractionID) {
        return this.knex.select("id", "cityid", "type ", "latitude ", "longitude ", "image")
            .from("attraction")
            .where("id", attractionID);
    }

    getAttractionByCityID(cityID) {
        return this.knex.select("id", "cityid", "type ", "latitude ", "longitude ", "image")
            .from("attraction")
            .where("cityid", cityID);
    }

    getAttractionByUser(userID) {
        return this.knex.select("id", "name" , "type ", "latitude ", "longitude ", "image")
            .from("attraction")
            .where({
                userid: userID,
                confirmstatus: 'accept'
            });
    }

    updateAttractionByUser(attractionID, cityid, type, latitude, longitude, image) {
        let updateObject = new Object();
        if (cityid != null) {
            updateObject.cityid = cityid;
        }
        if (type != null) {
            updateObject.type = type;
        }
        if (latitude != null) {
            updateContent.latitude = latitude;
        }
        if (longitude != null) {
            updateObject.longitude = longitude;
        }
        if (image != null) {
            updateObject.image = image;
        }
        return this.knex('attraction').update(updateObject).where("id", attractionID);
    }

    confirmAttractionStatusByAdmin(ID, confirmStatus) {
        let updateObject = new Object();
        if (confirmStatus != null) {
            updateObject.confirmstatus = confirmStatus;
        }
        return this.knex('attraction').update(updateObject).where("id", ID);
    }

    deleteAttractionBy(attractionID) {
        return this.knex('attraction').where('id', attractionID).del();
    }

    insertAttraction(cityid, name, type, latitude, longitude, image, description,userid) {
        console.log("insertin",cityid, name, type, latitude, longitude, image, description,userid)
        return this.knex('attraction').insert(
            { cityid: cityid, name:name, type: type, latitude: latitude, longitude: longitude , description: description,confirmstatus:"wait",userid:userid}
        );
    }
    //below function not even test
}