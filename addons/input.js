const Links = require('../addons/links');
const prompt = require('prompt-sync')();

const Product = new require('../tables/product');
const Seller = new require('../tables/seller');
const Review = new require('../tables/review');
const Type = new require('../tables/type');
const Faction = new require('../tables/faction');
const Difficulty = new require('../tables/difficulty');

module.exports = {
    Id() {
        var input = Number(prompt('Enter id: '.blue));
        return input;
    },
    ReviewI() {
        var review = new Review(null,
            prompt('Enter comment: '.blue),
            null,
            Number(prompt('Enter price: '.blue)),
            Number(prompt('Enter mark: '.blue)),
            prompt('Enter seller name: '.blue)
        );
        if (isNaN(review.product_cost)) {
            throw new Error('Invalid price.'.red);
        }
        if (isNaN(review.mark)) {
            throw new Error('Invalid mark.'.red);
        }
        return review;

    },
    ReviewS() {
        var review = new Review(null,
            prompt('Enter comment: '.blue),
            prompt('Enter date (YYYY-MM-DD): '.blue),
            Number(prompt('Enter price: '.blue)),
            Number(prompt('Enter mark: '.blue)),
            prompt('Enter seller name: '.blue)
        );
        if (review.date != '') {
            var date = new Date(review.date);
            if (date == 'Invalid Date') {
                throw new Error('Invalid date.'.red);
            }
        } else {
            review.date = null;
        }
        if (isNaN(review.product_cost)) {
            throw new Error('Invalid price.'.red);
        }
        if (isNaN(review.mark)) {
            throw new Error('Invalid mark.'.red);
        }
        if (review.comment == '') review.comment = null;
        if (review.product_cost == 0) review.product_cost = null;
        if (review.mark == 0) review.mark = null;
        if (review.seller == '') review.seller = null;
        return review;

    },
    FactionI() {
        var faction = new Faction(null,
            prompt('Enter name: '.blue));
        return faction;
    },
    D() {
        var d = new Difficulty(null,
            prompt('Enter name: '.blue));
        return d;
    },
    Type() {
        var type = new Type(null,
            prompt('Enter name: '.blue));
        return type;
    },
    ProductI() {
        var product = new Product(null,
            prompt('Enter name: '.blue),
            prompt('Enter description: '.blue),
            Number(prompt('Enter cost: '.blue)),
            prompt('Enter active: '.blue),
            prompt('Enter seller: '.blue),
            prompt('Enter faction: '.blue),
            prompt('Enter difficulty: '.blue),
            prompt('Enter type: '.blue)
        );
        if (isNaN(product.cost))
        {
            throw new Error('Invalid cost'.red);
        }
        return product;

    },
    ProductU() {
        var product = new Product(null,
            prompt('Enter name: '.blue),
            prompt('Enter description: '.blue),
            Number(prompt('Enter cost: '.blue)),
            prompt('Enter active: '.blue),
            prompt('Enter seller: '.blue),
            prompt('Enter faction: '.blue),
            prompt('Enter difficulty: '.blue),
            prompt('Enter type: '.blue)
        );
        if (isNaN(product.cost)) {
            throw new Error('Invalid cost.'.red);
        }
        if (product.name == '') product.name = null;
        if (product.description == '') product.description = null;
        if (product.cost == 0) product.cost = null;
        if (product.active == '') product.active = null;
        if (product.seller == '') product.seller = null;
        if (product.faction == '') product.faction = null;
        if (product.difficulty == '') product.difficulty = null;
        if (product.type == '') product.type = null;

        return product;
        
    },
    SellerI() {
        var seller = new Seller(null,
            prompt('Enter name: '.blue),
            null,
            null,
            null,
            null
        );
        return seller;
    },
    SellerU() {
        var seller = new Seller(null,
            prompt('Enter name: '.blue),
            null,
            null,
            null,
            null
        );
        
        if (seller.name == '') seller.name = null;
        if (seller.email == '') seller.email = null;
        return seller;
    },
    SellerS() {
        var seller = new Seller(null,
            prompt('Enter name: '.blue),
            prompt('Enter registration date: '.blue),
            Number(prompt('Enter reviews: '.blue)),
            Number(prompt('Enter rate: '.blue))
        );

        if (seller.reg_date != '') {
            var date = new Date(seller.reg_date);
            if (date == 'Invalid Date') {
                throw new Error('Invalid date.'.red);
            }
        } else {
            seller.reg_date = null;
        }
        if (seller.name == '') seller.name = null;
        if (isNaN(seller.reviews)) seller.reviews = null;
        if (isNaN(seller.rate)) seller.rate = null;

        return seller;

    },
    Gen() {
        // var t = prompt('Enter type: '.blue);
        var n = prompt('Enter amount: '.blue);
        var input = {
            link: Links['Dungeons'],
            type: 'Dungeons',
            n: n
        }

        return input;
    },
    Amount() {
        var n = prompt('Amount: '.blue);
        if (n == '-')
        {
            n = 9999999;
        }
        return n;
    }

}