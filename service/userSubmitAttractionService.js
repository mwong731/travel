

module.exports = class UserSubmitAttractionService {
    constructor(knex) {
        this.knex = knex;
    }

    getAttractionByAttractionID(attractionID) {
        return this.knex.select("id", "cityid", "type ", "latitude ", "longitude ", "image")
            .from("usersubmitattraction")
            .where("id", attractionID);
    }

    getAttractionByCityID(cityID) {
        return this.knex.select("id", "cityid", "type ", "latitude ", "longitude ", "image")
            .from("usersubmitattraction")
            .where("cityid", cityID);
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
        return this.knex('usersubmitattraction').update(updateObject).where("id", attractionID);
    }

    confirmAttractionStatusByAdmin(ID, confirmStatus) {
        let updateObject = new Object();
        if (confirmStatus != null) {
            updateObject.confirmstatus = confirmStatus;
        }
        return this.knex('usersubmitattraction').update(updateObject).where("id", ID);
    }

    deleteAttractionBy(attractionID) {
        return this.knex('usersubmitattraction').where('id', attractionID).del();
    }

    insertAttraction(cityid, type, latitude, longitude, image) {
        return this.knex('usersubmitattraction').insert([
            { cityid: cityid, type: type, latitude: latitude, longitude: longitude, image: image ,confirmstatus:"wait"}
        ]);
    }
    //below function not even test
}