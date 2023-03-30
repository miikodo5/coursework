const {
    read
} = require('fs');
const DB = require('./db-class');

class queries {
    constructor(dbConfig) {
        this.db = new DB(dbConfig);
    }

    //        //
    // review //
    //        //

    async getReviews(n) { // get All
        const sql =
            `SELECT reviews.id, reviews.comment, reviews.date, 
            reviews.product_cost, reviews.mark, sellers.name as seller  
            FROM reviews
            INNER JOIN sellers ON sellers.id = reviews.seller_id
            LIMIT ` + n + ``;
        const result = await this.db.query(sql);
        return result;
    }

    async getReview(id) { //get by id
        const sql =
            `SELECT reviews.id, reviews.comment, reviews.date, 
            reviews.product_cost, reviews.mark, sellers.name as seller  
            FROM reviews
            INNER JOIN sellers ON sellers.id = reviews.seller_id
            WHERE reviews.id = ` + id;
        const result = await this.db.query(sql);
        return result;
    }

    async getReviewByName(name) { //get by name
        const sql =
            `SELECT *, 
            (SELECT CAST(COUNT(*) AS INTEGER) FROM reviews WHERE reviews.seller_id = sellers.id) as reviews, 
            (SELECT CAST(AVG(mark) AS INTEGER) FROM reviews WHERE reviews.seller_id = sellers.id) as rate  
            FROM sellers WHERE reviews.comment LIKE( '` + name + `' )
            `;
        const result = await this.db.query(sql);
        return result;
    }

    async insertReview(data) {
        const sql =
            `INSERT INTO reviews(
            seller_id, comment, mark, product_cost)
            VALUES(` + data.seller + `, '` + data.comment + `', ` + data.mark + `, ` + data.product_cost + `) 
            RETURNING reviews.id `;
        // console.dir(data);
        const result = await this.db.query(sql);
        return result.rows[0].id;
    }

    async removeReview(id) {
        const sql = `DELETE FROM reviews
    WHERE id = ` + id + ` RETURNING id`;
        const result = await this.db.query(sql);
        return result.rows[0].id;
    }

    async searchReviews(review) {
        var where = 0;
        var and = 0;
        var sql = `SELECT reviews.id, reviews.comment, reviews.date, 
            reviews.product_cost, reviews.mark, sellers.name as seller  
            FROM reviews
            INNER JOIN sellers ON sellers.id = reviews.seller_id`;
        if (review.comment) {
            if (!where) {
                sql += ` WHERE `;
                where = 1;
            }
            if (!and) {
                and = 1;
            } else {
                sql += ` AND `;
            }

            sql += `reviews.comment LIKE '%` + review.comment + `%'`;
        }
        if (review.date) {
            if (!where) {
                sql += ` WHERE `;
                where = 1;
            }
            if (!and) {
                and = 1;
            } else {
                sql += ` AND `;
            }

            sql += `reviews.date = CAST('` + review.date + `' AS timestamp without time zone)`;
        }
        if (review.product_cost) {
            if (!where) {
                sql += ` WHERE `;
                where = 1;
            }
            if (!and) {
                and = 1;
            } else {
                sql += ` AND `;
            }

            sql += `reviews.product_cost = '` + review.product_cost + `'`;
        }
        if (review.mark) {
            if (!where) {
                sql += ` WHERE `;
                where = 1;
            }
            if (!and) {
                and = 1;
            } else {
                sql += ` AND `;
            }

            sql += `mark = '` + review.mark + `'`;
        }
        if (review.seller) {
            if (!where) {
                sql += ` WHERE `;
                where = 1;
            }
            if (!and) {
                and = 1;
            } else {
                sql += ` AND `;
            }

            sql += `sellers.name LIKE '%` + review.seller + `%'`;
        }

        var result = await this.db.query(sql);
        return result;
    }
    //            //
    // difficulty //
    //            //
    async getDifficulties() { //get all
        const sql =
            `SELECT * FROM difficulties`;
        const result = await this.db.query(sql);
        return result;
    }

    async getDifficulty(id) { //get by id
        const sql =
            `SELECT * FROM difficulties WHERE id = ` + id;
        const result = await this.db.query(sql);
        return result;
    }

    async getDifficultyByName(name) { //get by name
        const sql =
            `SELECT * FROM difficulties WHERE name LIKE ('` + name + `')`;
        const result = await this.db.query(sql);
        return result;
    }

    async insertDifficulty(difficulty) {
        const sql =
            `INSERT INTO public.difficulties(
            name)
            VALUES('` + difficulty.name + `') RETURNING id
        `;
        const result = await this.db.query(sql);
        return result.rows[0].id;
    }

    async removeDifficulty(id) {
        const sql = `DELETE FROM difficulties
    WHERE id = ` + id + ` RETURNING id`;
        const result = await this.db.query(sql);
        return result.rows[0].id;
    }
    //         //
    // faction //
    //         //
    async getFactions() { // get All
        const sql =
            `SELECT * FROM factions`;
        const result = await this.db.query(sql);
        return result;
    }

    async getFaction(id) { //get by id
        const sql =
            `SELECT * FROM factions WHERE id =` + id;
        const result = await this.db.query(sql);
        return result;
    }

    async getFactionByName(name) { //get by name
        const sql =
            `SELECT * FROM factions WHERE name LIKE ('` + name + `')`;
        const result = await this.db.query(sql);
        return result;
    }

    async insertFaction(faction) {
        const sql =
            `INSERT INTO factions(
            name)
            VALUES ('` + faction.name + `') RETURNING id`;

        const result = await this.db.query(sql);
        return result.rows[0].id;
    }

    async removeFaction(id) {
        const sql = `DELETE FROM factions
    WHERE id = ` + id + ` RETURNING id`;
        const result = await this.db.query(sql);
        return result.rows[0].id;
    }
    //        //
    // seller //
    //        //
    async getSellers(n) { // get All
        const sql =
            `SELECT *, 
            (SELECT CAST(COUNT(*) AS INTEGER) FROM reviews WHERE reviews.seller_id = sellers.id) as reviews, 
            (SELECT CAST(AVG(mark) AS INTEGER) FROM reviews WHERE reviews.seller_id = sellers.id) as rate  
            FROM sellers
            LIMIT ` + n + `
            `;
        const result = await this.db.query(sql);
        return result;
    }

    async getSeller(id) { //get by id
        const sql =
            `SELECT *, 
            (SELECT CAST(COUNT(*) AS INTEGER) FROM reviews WHERE reviews.seller_id = sellers.id) as reviews, 
            (SELECT CAST(AVG(mark) AS INTEGER) FROM reviews WHERE reviews.seller_id = sellers.id) as rate  
            FROM sellers WHERE id = ` + id;
        const result = await this.db.query(sql);
        return result;
    }

    async getSellerByName(name) { //get by name
        const sql =
            `SELECT *, 
            (SELECT CAST(COUNT(*) AS INTEGER) FROM reviews WHERE reviews.seller_id = sellers.id) as reviews, 
            (SELECT CAST(AVG(mark) AS INTEGER) FROM reviews WHERE reviews.seller_id = sellers.id) as rate  
            FROM sellers WHERE name LIKE ('` + name + `')`;
        const result = await this.db.query(sql);
        return result;
    }

    async insertSeller(seller) {
        const sql = `
        INSERT INTO sellers(
            name)
        VALUES( '` + seller.name + `')
        RETURNING sellers.id`;
        const result = await this.db.query(sql);
        return result.rows[0].id;
    }

    async insertSellerG(seller) {
        const sql = `
        INSERT INTO sellers(
            id, name, registration_date)
        VALUES(` + Number(seller.id) + `,'` + seller.name + `', CAST('` + seller.reg_date + `'
            AS timestamp without time zone))
        RETURNING sellers.id`;
        const result = await this.db.query(sql);
        return result.rows[0].id;
    }

    async removeSeller(id) {
        const sql = `DELETE FROM sellers
    WHERE id = ` + id + ` RETURNING id`;
        const result = await this.db.query(sql);
        return result.rows[0].id;
    }

    async searchSellers(seller) {
        var where = 0;
        var and = 0;
        var sql = `SELECT *, 
            (SELECT CAST(COUNT(*) AS INTEGER) FROM reviews WHERE reviews.seller_id = sellers.id) as reviews, 
            (SELECT CAST(AVG(mark) AS INTEGER) FROM reviews WHERE reviews.seller_id = sellers.id) as rate  
            FROM sellers
            `
        if (seller.name) {
            if (!where) {
                sql += ` WHERE `;
                where = 1;
            }
            if (!and) {
                and = 1;
            } else {
                sql += ` AND `;
            }

            sql += `name LIKE '%` + seller.name + `%'`;
        }
        if (seller.reviews) {
            if (!where) {
                sql += ` WHERE `;
                where = 1;
            }
            if (!and) {
                and = 1;
            } else {
                sql += ` AND `;
            }

            sql += `(SELECT CAST(COUNT(*) AS INTEGER) FROM reviews WHERE reviews.seller_id = sellers.id) = ` + seller.reviews;
        }
        if (seller.rate) {
            if (!where) {
                sql += ` WHERE `;
                where = 1;
            }
            if (!and) {
                and = 1;
            } else {
                sql += ` AND `;
            }

            sql += `(SELECT CAST(AVG(mark) AS INTEGER) FROM reviews WHERE reviews.seller_id = sellers.id) =` + seller.rate;
        }
        sql += `
        ORDER BY reviews DESC`;
        var result = await this.db.query(sql);
        return result;
    }

    async updateSeller(seller) {
        var sql = `
            UPDATE sellers
            SET name = '` + seller.name + `'
            WHERE id = ` + seller.id + ` 
            RETURNING id
        `;

        const result = await this.db.query(sql);
        return result.rows[0].id;
    }
    //      //
    // type //
    //      //
    async getTypes() { // get All
        const sql =
            `SELECT * FROM types`;
        const result = await this.db.query(sql);
        return result;
    }

    async getType(id) { //get by id
        const sql =
            `SELECT * FROM types WHERE id =` + id;
        const result = await this.db.query(sql);
        return result;
    }

    async getTypeByName(name) { //get by name

        const sql =
            `SELECT * FROM types WHERE name LIKE ('` + name + `')`;
        const result = await this.db.query(sql);
        return result;
    }

    async insertType(type) {
        const sql =
            `INSERT INTO public.types(
            name)
            VALUES('` + type.name + `') RETURNING id
        `;
        const result = await this.db.query(sql);
        return result.rows[0].id;
    }

    async removeType(id) {
        const sql = `DELETE FROM types
    WHERE id = ` + id + ` RETURNING id`;
        const result = await this.db.query(sql);
        return result.rows[0].id;
    }
    //         //
    // product //
    //         //
    async getProducts(n) // get All
    {
        const sql =
            `SELECT products.id,
        products.name, products.cost, products.description,
        products.active, types.name as type, factions.name as faction,
        difficulties.name as difficulty, sellers.name as seller
        FROM products
        INNER JOIN sellers ON sellers.id = products.seller_id
        INNER JOIN types ON types.id = products.type_id
        INNER JOIN factions ON factions.id = products.faction_id
        INNER JOIN difficulties ON difficulties.id = products.difficulty_id
        LIMIT ` + n + `
        `;
        const result = await this.db.query(sql);
        return result;
    }

    async getProduct(id) { //get by id
        const sql =
            `SELECT products.id,
        products.name, products.cost, products.description,
        products.active, types.name as type, factions.name as faction,
        difficulties.name as difficulty, sellers.name as seller
        FROM products
        INNER JOIN sellers ON sellers.id = products.seller_id
        INNER JOIN types ON types.id = products.type_id
        INNER JOIN factions ON factions.id = products.faction_id
        INNER JOIN difficulties ON difficulties.id = products.difficulty_id
        WHERE products.id = ` + id;

        const result = await this.db.query(sql);


        return result;
    }

    async isExcistProduct(id) { //get by id
        const sql =
            `SELECT *
        FROM products
        WHERE products.id = ` + id;

        const result = await this.db.query(sql);


        return result;
    }

    async getProductByName(name) { //get by name
        const sql =
            `SELECT products.id,
        products.name, products.cost, products.description,
        products.active, types.name as type, factions.name as faction,
        difficulties.name as difficulty, sellers.name as seller
        FROM products
        INNER JOIN sellers ON sellers.id = products.seller_id
        INNER JOIN types ON types.id = products.type_id
        INNER JOIN factions ON factions.id = products.faction_id
        INNER JOIN difficulties ON difficulties.id = products.difficulty_id
        WHERE products.name LIKE ( '` + name + `' )
        `;
        const result = await this.db.query(sql);
        return result;
    }

    async insertProduct(product) {
        const sql =
            `INSERT INTO public.products(
            type_id, seller_id, name, description, cost, active, faction_id, difficulty_id)
            VALUES(` + product.type + `, ` + product.seller + `, '` + product.name + `',
             '` + product.description + `',
             ` + product.cost + `, ` + product.active + `, ` + product.faction + `, 
             ` + product.difficulty + `) RETURNING id
        `;
        const result = await this.db.query(sql);
        return result.rows[0].id;
    }

    async insertProductG(product) {
        const sql =
            `INSERT INTO public.products(
            id, type_id, seller_id, name, description, cost, active, faction_id, difficulty_id)
            VALUES(` + product.id + `, ` + product.type + `, ` + product.seller + `, '` + product.name + `',
             '` + product.description + `',
             ` + product.cost + `, ` + product.active + `, ` + product.faction + `, 
             ` + product.difficulty + `) RETURNING id
        `;
        // console.log(sql);
        const result = await this.db.query(sql);
        return result.rows[0].id;
    }

    async removeProduct(id) {
        const sql = `DELETE FROM products
        WHERE id = ` + id + ` RETURNING id`;
        const result = await this.db.query(sql);
        return result.rows[0].id;
    }

    async updateProduct(product) {
        const sql = `
        UPDATE products
        SET type_id=` + product.type + `, 
        seller_id = ` + product.seller + `, name = '` + product.name + `',
        description = '` + product.description + `', cost = ` + product.cost + `, 
        active = ` + product.active + `,
        faction_id = ` + product.faction + `, difficulty_id = ` + product.difficulty + `
        WHERE id = ` + product.id + `
        RETURNING id
        `;
        const result = await this.db.query(sql);
        return result.rows[0].id;
    }

    async searchProducts(product) {
        var where = 0;
        var and = 0;
        var sql = `SELECT products.id,
        products.name, products.cost, products.description,
        products.active, types.name as type, factions.name as faction,
        difficulties.name as difficulty, sellers.name as seller
        FROM products
        INNER JOIN sellers ON sellers.id = products.seller_id
        INNER JOIN types ON types.id = products.type_id
        INNER JOIN factions ON factions.id = products.faction_id
        INNER JOIN difficulties ON difficulties.id = products.difficulty_id`
        if (product.name) {
            if (!where) {
                sql += ` WHERE `;
                where = 1;
            }
            if (!and) {
                and = 1;
            } else {
                sql += ` AND `;
            }

            sql += `products.name LIKE '%` + product.name + `%'`;
        }
        if (product.cost) {
            if (!where) {
                sql += ` WHERE `;
                where = 1;
            }
            if (!and) {
                and = 1;
            } else {
                sql += ` AND `;
            }

            sql += `products.cost = '` + product.cost + `'`;
        }
        if (product.description) {
            if (!where) {
                sql += ` WHERE `;
                where = 1;
            }
            if (!and) {
                and = 1;
            } else {
                sql += ` AND `;
            }

            sql += `products.description LIKE '%` + product.description + `%'`;
        }
        if (product.active) {
            if (!where) {
                sql += ` WHERE `;
                where = 1;
            }
            if (!and) {
                and = 1;
            } else {
                sql += ` AND `;
            }

            sql += `products.active = '` + product.active + `'`;
        }
        if (product.type) {
            if (!where) {
                sql += ` WHERE `;
                where = 1;
            }
            if (!and) {
                and = 1;
            } else {
                sql += ` AND `;
            }

            sql += `types.name LIKE '%` + product.type + `%'`;
        }
        if (product.faction) {
            if (!where) {
                sql += ` WHERE `;
                where = 1;
            }
            if (!and) {
                and = 1;
            } else {
                sql += ` AND `;
            }

            sql += `factions.name LIKE '%` + product.faction + `%'`;
        }
        if (product.difficulty) {
            if (!where) {
                sql += ` WHERE `;
                where = 1;
            }
            if (!and) {
                and = 1;
            } else {
                sql += ` AND `;
            }

            sql += `difficulties.name LIKE '%` + product.difficulty + `%'`;
        }
        if (product.seller) {
            if (!where) {
                sql += ` WHERE `;
                where = 1;
            }
            if (!and) {
                and = 1;
            } else {
                sql += ` AND `;
            }

            sql += `sellers.name LIKE '%` + product.seller + `%'`;
        }
        sql += `
        ORDER BY products.cost ASC `;
        var result = await this.db.query(sql);
        return result;
    }

    async analyze() {
        var sql = `SELECT COUNT(*) as Alliance, (SELECT COUNT(*) FROM products
                    INNER JOIN factions ON factions.id = products.faction_id
                    WHERE factions.name = 'Horde') as Horde  FROM products
                    INNER JOIN factions ON factions.id = products.faction_id
                    WHERE factions.name = 'Alliance'`;
        const result = await this.db.query(sql);
        return result.rows;
    }

    async analyze2() {
        var sql = `
        SELECT
            (SELECT COUNT( * ) as y2015 FROM sellers WHERE CAST(registration_date as varchar) LIKE '%2015%'),
            (SELECT COUNT( * ) as y2016 FROM sellers WHERE CAST(registration_date as varchar) LIKE '%2016%'),
            (SELECT COUNT( * ) as y2017 FROM sellers WHERE CAST(registration_date as varchar) LIKE '%2017%'),
            (SELECT COUNT( * ) as y2018 FROM sellers WHERE CAST(registration_date as varchar) LIKE '%2018%'),
            (SELECT COUNT( * ) as y2019 FROM sellers WHERE CAST(registration_date as varchar) LIKE '%2019%'),
            (SELECT COUNT( * ) as y2020 FROM sellers WHERE CAST(registration_date as varchar) LIKE '%2020%'),
            (SELECT COUNT( * ) as y2021 FROM sellers WHERE CAST(registration_date as varchar) LIKE '%2021%')
        `
        const result = await this.db.query(sql);
        return result.rows;
    }

    async analyze3() {
        var sql = `SELECT difficulties.name, COUNT(products.id), AVG(products.cost) FROM products 
INNER JOIN difficulties ON difficulties.id = products.difficulty_id
WHERE difficulties.name != ''
GROUP BY difficulties.name 
        `
        const result = await this.db.query(sql);
        return result.rows;
    }

    async analyze4() {
        var sql = `SELECT difficulties.name as dif, factions.name as fac, AVG(products.cost) FROM products
INNER JOIN factions ON factions.id = products.faction_id
INNER JOIN difficulties ON difficulties.id = products.difficulty_id
WHERE difficulties.name != ''
GROUP BY difficulties.name, factions.name
ORDER BY difficulties.name`
        const result = await this.db.query(sql);
        return result.rows;
    }

    async indexTest1(index) {
        if (index == true) {
            var sql = `
        SET enable_bitmapscan = On;
        SET enable_seqscan = Off;`;
        } else {
            var sql = `
        SET enable_bitmapscan = Off;
        SET enable_seqscan = On;`;
        }
        await this.db.query(sql);
        sql += `
        EXPLAIN ANALYZE

        SELECT sellers.name, reviews.comment FROM sellers
        INNER JOIN reviews ON reviews.seller_id = sellers.id
        WHERE name LIKE 'koltowa'
        OR sellers.id = 2000000;;
        `;
        var result = await this.db.query(sql);
        if (index == true) {
            return result[2].rows[result[2].rows.length - 1];
        }
        else {
            return result[2].rows[result[2].rows.length - 1];
        }
    }

    async indexTest2(index) {
        if (index == true) {
            var sql = `
        SET enable_bitmapscan = On;
        SET enable_seqscan = Off;`;
        } else {
            var sql = `
        SET enable_bitmapscan = Off;
        SET enable_seqscan = On;`;
        }
        await this.db.query(sql);
        sql += `
        EXPLAIN ANALYZE

        SELECT COUNT( * ) FROM products
        WHERE products.id BETWEEN 6377838 AND 6386774
        AND products.cost BETWEEN 1000 AND 3000;
        `;
        var result = await this.db.query(sql);
        if (index == true) {
            return result[2].rows[result[2].rows.length - 1];
        } else {
            return result[2].rows[result[2].rows.length - 1];
        }
    }
}

module.exports = queries;