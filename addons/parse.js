const Product = new require('../tables/product');
const Seller = new require('../tables/seller');
const Review = new require('../tables/review');
const Type = new require('../tables/type');
const Faction = new require('../tables/faction');
const Difficulty = new require('../tables/difficulty');

module.exports = {
    product(data){
        let products = [];
        if (data.rows.length)
        {
            for (let temp of data.rows)
            {
                let product = new Product(
                    temp.id,
                    temp.name,
                    temp.description,
                    temp.cost,
                    temp.active,
                    temp.seller,
                    temp.faction,
                    temp.difficulty,
                    temp.type
                );
                products.push(product);
            }    
        }
        return products;
    },
    seller(data) {
        let sellers = [];
        if (data.rows.length) {
            for (let temp of data.rows) {
                let seller = new Seller(
                    temp.id,
                    temp.name,
                    temp.registration_date,
                    temp.email,
                    temp.reviews,
                    temp.rate
                    
                );
                sellers.push(seller);
            }
        }
        return sellers;
    },
    review(data) {
        let reviews = [];
        if (data.rows.length) {
            for (let temp of data.rows) {
                let review = new Review(
                    temp.id,
                    temp.comment,
                    temp.date,
                    temp.product_cost,
                    temp.mark,
                    temp.seller
                );
                reviews.push(review);
            }
        }
        return reviews;
    },
    type(data) {
        let types = [];
        if (data.rows.length) {
            for (let temp of data.rows) {
                let type = new Type(
                    temp.id,
                    temp.name
                );
                types.push(type);
            }
        }
        return types;
    },
    faction(data) {
        let factions = [];
        if (data.rows.length) {
            for (let temp of data.rows) {
                let faction = new Faction(
                    temp.id,
                    temp.name
                );
                factions.push(faction);
            }
        }
        return factions;
    },
    difficulty(data) {
        let difficulties = [];
        if (data.rows.length) {
            for (let temp of data.rows) {
                let difficulty = new Difficulty(
                    temp.id,
                    temp.name
                );
                difficulties.push(difficulty);
            }
        }
        return difficulties;
    },

    
}