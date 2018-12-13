


module.exports = class AttractionImageService {
    constructor(knex) {
        this.knex = knex;
    }
    // Select
    getImageAttractionByAttractionID(attractionID) {
        return this.knex.select()
            .from("attractionimage")
            .where("attractionid", attractionID);
    }
    // Insert
    insertImageArray(fileObject) {
        return this.knex("attractionimage")
            .insert(fileObject);
    }
    insertImage(fileObject) {
        console.log("insertImage(fileObject) " + fileObject.attractionid)
        return this.knex("attractionimage")
            .insert(fileObject);
    }
    // Delete
    deleteImage(ids) {
        console.log(ids);
        return this.knex('attractionimage')
            .whereIn('id', ids)
            .del();
    }

}