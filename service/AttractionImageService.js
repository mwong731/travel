

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

}