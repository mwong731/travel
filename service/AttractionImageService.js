

module.exports = class AttractionImageService {
    constructor(knex) {
        this.knex = knex;
    }
    
    getImageAttractionByAttractionID(attractionID) {
        return this.knex.select("id", "attractionid", "image")
            .from("attractionimage")
            .where("attractionid", attractionID);
    }

}