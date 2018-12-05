
module.exports = class UserSubmitAttractionService {
    constructor() {
        this.knex = knex;
    }

    getAttractionInAttractionID(attractionID) {
        return this.knex.select("id", "cityid", "type ", "latitude ", "longitude ", "image")
            .from("usersubmitattraction")
            .where("id", attractionID);
    }

    updateAttractionByUser(attractionID, cityid, type, latitude, longitude, image) {
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
        return this.knex('usersubmitattraction').update(insertObject).where("id", attractionID);
    }

    confirmAttractionByAdmin(attractionID, confirmStatus) {
        let updateObject = new Object();
        if (confirmStatus != null) {
            updateObject.confirmstatus = confirmStatus;
        }
        return this.knex('usersubmitattraction').update(updateObject).where("id", attractionID);
    }

    deleteAttraction(attractionID) {
        return knex('usersubmitattraction').where('id', attractionID).del();
    }

    insert(cityid, type, latitude, longitude, image) {
        return knex('usersubmitattraction').insert([
            { cityid: cityid, type: type, latitude: latitude, longitude: longitude, image: image ,confirmstatus:"wait"}
        ]);
    }
}