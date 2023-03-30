const Parse = require('../addons/parse');
const Print = require('../addons/print');
const Generation = require('../addons/generation');
var i = 0;
//
const db = require('../database/db-queries');
const config = require('../database/db-config');

var cheerio = require('cheerio');
const https = require('https');


const queries = require('../database/db-queries');
const Product = new require('../tables/product');
const Seller = new require('../tables/seller');
const Review = new require('../tables/review');
const Type = new require('../tables/type');
const Faction = new require('../tables/faction');
const Difficulty = new require('../tables/difficulty');
const query = new db(config);
//


var arrayf = {
    async getReviews(n) {
        var result = Parse.review(await query.getReviews(n));
        Print.table(result);

    },
    async getReviewByName(name) {
        var result = Parse.review(await query.getReviewByName(name));
        Print.table(result);
    },
    async getReview(id) {
        var result = Parse.review(await query.getReview(id));
        Print.table(result);
        return result;
    },
    async insertReview(review) {
        var s = await arrayf.getSellerByName(review.seller);
        if (!s.length) {
            // var temp = new Seller(null, review.seller, null, '', 0, 0);
            // s = await arrayf.insertSeller(temp);
            // review.seller = s;
            throw new Error("Seller doesn`t exist.".red)
        } else {
            review.seller = s[0].id;
        }
        var result = await query.insertReview(review);
        await arrayf.getReview(result);
        return result;
    },
    async removeReview(id) {
        var test = await arrayf.getReview(id);
        if (!test.length) {
            throw new Error("Doesn`t exist.".red);
        }
        var result = await query.removeReview(id);
        console.log('Successfully removed'.green);
    },
    async searchReviews(review) {
        var result = Parse.review(await query.searchReviews(review));
        Print.table(result);
    },
    async generationReviews(link) {
        var sLink = 'https://funpay.ru/en/users/' + link + '/';
        var run = new Promise(function (resolve, reject) {
            var temp;
            var review = new Review(null, null, null, null, null, link);

            https.get(sLink, async (res) => {
                // DATA
                let body = [];
                res.on('data', function (chunk) {
                    body.push(chunk);
                });
                // END
                res.on('end', async () => {
                    body = Buffer.concat(body).toString();
                    let $ = cheerio.load(body);
                    if (!$('.dyn-table-body')['0']) {
                        return;
                    }
                    $ = cheerio.load($('.dyn-table-body').html());

                    for (var i = 0; i < $('.review-container').length; i++) {
                        // COMMENT
                        temp = $(".review-item-text")[i]['children'][0]['data'].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
                        review.comment = temp.trim();
                        //MARK  
                        review.mark = getRandomInt(6);
                        //COST
                        temp = $(".review-item-detail")[i]['children'][0]['data'].split(',');
                        temp = temp[1].trim().split(' ');
                        review.product_cost = Number(temp[0]);

                        var result = await query.insertReview(review);


                    }
                    resolve();
                });

            })

        })
        await run.then(() => {});

        return 1;
    },
    async generationReviewsB(link, id) {
        var run = new Promise(async function (resolve, reject) {
            var temp;
            var review = new Review(null, null, null, null, null, id);
            var body = link.toString();
            let $ = cheerio.load(body);
            if (!$('.dyn-table-body')['0']) {
                resolve();
                return;
            }
            $ = cheerio.load($('.dyn-table-body').html());

            for (var i = 0; i < $('.review-container').length; i++) {
                // COMMENT
                temp = $(".review-item-text")[i]['children'][0]['data'].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
                review.comment = temp.trim();
                //MARK  
                review.mark = getRandomInt(6);
                //COST
                temp = $(".review-item-detail")[i]['children'][0]['data'].split(',');
                if (temp.length == 2) {
                    temp = temp[1].trim().split(' ');
                } else if (temp.length = 3) {
                    temp = temp[2].trim().split(' ');
                }
                review.product_cost = Number(temp[0]);

                var result = await query.insertReview(review);


            }
            resolve();




        })
        await run.then(() => {});

        return 1;
    },
    //
    //
    //
    async getFactions() {
        var result = Parse.faction(await query.getFactions());
        Print.table(result);
    },
    async getFactionByName(name) {
        var result = Parse.faction(await query.getFactionByName(name));
        return result;
    },
    async getFaction(id) {
        var result = Parse.faction(await query.getFaction(id));
        Print.table(result);
        return result;
    },
    async insertFaction(faction) {
        var result = await query.insertFaction(faction);
        await arrayf.getFaction(result);
        return result;
    },
    async removeFaction(id) {
        var test = await arrayf.getFaction(id);
        if (!test.length) {
            throw new Error("Doesn`t exist.".red);
        }
        var result = await query.removeFaction(id);
        console.log('Successfully removed'.green);
    },
    async searchFactions() {
        // TODO
        console.log(i++);
    },
    async generationFactions() {
        // TODO
        console.log(i++);
    },
    //
    //
    //
    async getDifficulties() {
        var result = Parse.difficulty(await query.getDifficulties());
        Print.table(result);
    },
    async getDifficultyByName(name) {
        var result = Parse.difficulty(await query.getDifficultyByName(name));
        return result;
    },
    async getDifficulty(id) {
        var result = Parse.difficulty(await query.getDifficulty(id));
        Print.table(result);
        return result;
    },
    async insertDifficulty(difficulty) {
        var result = await query.insertDifficulty(difficulty);
        await arrayf.getDifficulty(result);
        return result;
    },
    async removeDifficulty(id) {
        var test = await arrayf.getDifficulty(id);
        if (!test.length) {
            throw new Error("Doesn`t exist.".red);
        }
        var result = await query.removeDifficulty(id);
        console.log('Successfully removed'.green);
    },
    async searchDifficultys() {
        // TODO
        console.log(i++);
    },
    async generationDifficulties() {
        // TODO
        console.log(i++);
    },
    //
    //
    //
    async getTypes() {
        var result = Parse.type(await query.getTypes());
        Print.table(result);
    },
    async getTypeByName(name) {
        var result = Parse.type(await query.getTypeByName(name));
        return result;
    },
    async getType(id) {
        var result = Parse.type(await query.getType(id));
        Print.table(result);
        return result;
    },
    async insertType(type) {
        var result = await query.insertType(type);
        await arrayf.getType(result);
        return result;
    },
    async removeType(id) {
        var test = await arrayf.getType(id);
        if (!test.length) {
            throw new Error("Doesn`t exist.".red);
        }
        var result = await query.removeType(id);
        console.log('Successfully removed'.green);
    },
    async searchTypes() {
        // TODO
        console.log(i++);
    },
    async generationTypes() {
        // TODO
        console.log(i++);
    },
    //
    //
    //
    async getProducts(n) {
        var result = Parse.product(await query.getProducts(n));
        Print.table(result);
    },
    async getProductByName(name) {
        var result = Parse.product(await query.getProductByName(name));
        return result;
    },
    async getProduct(id) {
        var result = Parse.product(await query.getProduct(id));
        Print.table(result);
        return result;
    },
    async isExistProduct(id) {
        var result = await query.isExcistProduct(id);
        return result.rows;
    },
    async insertProduct(product) {
        //is seller exist
        var seller = await arrayf.getSellerByName(product.seller);
        if (!seller.length) {
            throw new Error('Seller doesn`t exist.'.red);
        } else {
            product.seller = seller[0].id;
        }
        //is type exist
        var type = await arrayf.getTypeByName(product.type);
        if (!type.length) {
            throw new Error('Type doesn`t exist.'.red);
        } else {
            product.type = type[0].id;
        }
        //is faction exist
        var faction = await arrayf.getFactionByName(product.faction);
        if (!faction.length) {
            throw new Error('Faction doesn`t exist.'.red);
        } else {
            product.faction = faction[0].id;
        }
        //is difficulty exist
        var difficulty = await arrayf.getDifficultyByName(product.difficulty);
        if (!difficulty.length) {
            throw new Error('Difficulty doesn`t exist.'.red);
        } else {
            product.difficulty = difficulty[0].id;
        }



        var result = await query.insertProduct(product);
        await arrayf.getProduct(result);
        return result;
    },
    async removeProduct(id) {
        var test = await arrayf.getProduct(id);
        if (!test.length) {
            throw new Error("Doesn`t exist.".red);
        }

        var result = await query.removeProduct(id);
        console.log('Successfully removed'.green);
    },
    async updateProduct(product) {
        var isExist = await arrayf.getProduct(product.id);
        if (!isExist.length) {
            throw new Error("Product doesn`t exist".red);
        }

        product.name = product.name ? product.name : isExist[0].name;
        product.description = product.description ? product.description : isExist[0].description;
        product.difficulty = product.difficulty ? product.difficulty : isExist[0].difficulty;
        product.faction = product.faction ? product.faction : isExist[0].faction;
        product.type = product.type ? product.type : isExist[0].type;
        product.cost = product.cost ? product.cost : isExist[0].cost;
        product.active = product.active ? product.active : isExist[0].active;
        product.seller = product.seller ? product.seller : isExist[0].seller;


        // is seller exist

        var seller = await arrayf.getSellerByName(product.seller);

        if (!seller.length) {
            throw new Error('Seller doesn`t exist.'.red);
        } else {
            product.seller = seller[0].id;
        }
        //is seller type
        var type = await arrayf.getTypeByName(product.type);

        if (!type.length) {
            throw new Error('Type doesn`t exist.'.red);
        } else {
            product.type = type[0].id;
        }
        //is faction exist
        var faction = await arrayf.getFactionByName(product.faction);
        if (!faction.length) {
            throw new Error('Faction doesn`t exist.'.red);
        } else {
            product.faction = faction[0].id;
        }
        //is difficulty exist
        var difficulty = await arrayf.getDifficultyByName(product.difficulty);
        if (!difficulty.length) {
            throw new Error('Difficulty doesn`t exist.'.red);
        } else {
            product.difficulty = difficulty[0].id;
        }


        var result = await query.updateProduct(product);
        await arrayf.getProduct(result);
        return result;

    },
    async searchProducts(product) {
        var result = Parse.product(await query.searchProducts(product));
        Print.table(result);
    },
    async generationProducts(link) {
        var run = new Promise(function (resolve, reject) {
            var temp;
            var product = new Product(null, null, null, null, true, null, null, null, null);
            
            https.get(link.link, async (res) => {
                // DATA
                let body = [];
                res.on('data', function (chunk) {
                    body.push(chunk);
                });
                // END
                res.on('end', async () => {
                    body = Buffer.concat(body).toString();
                    let $ = cheerio.load(body);
                    $ = cheerio.load($('.tc').html());
                    var inx = 0;
                    for (var i = 0; i < link.n; inx++, i++) {
                        process.stdout.write("\r\x1b[K");
                        process.stdout.write("[");
                        for (let j = 0; j < inx; j += link.n / 100) {
                            process.stdout.write("=");
                        }
                        for (let j = 0; j < link.n - inx - 1; j += link.n / 100) {
                            process.stdout.write(' ');
                        }
                        process.stdout.write("] " + inx);
                        // PRODUCT ID
                        var sellerId = $(".tc-item")[i.toString()]['attribs']['href'].split('='); //seller id
                        product.id = Number(sellerId[sellerId.length - 1]);
                        // console.dir($(".tc-item")[i.toString()]['attribs']['href']);
                        
                        // DESCRIPTIPN
                        product.description = await Generation.getDescription(product.id);
                        // TYPE
                        product.type = link.type;

                        //diff
                        if (link.type == "Dungeons") {
                            temp = $(".tc-item")[i.toString()]['attribs']['data-f-difficulty']; // тип
                            switch (temp) {
                                case 'обычный':
                                    product.difficulty = 'Normal';
                                    break;
                                case 'эпохальный ключ':
                                    product.difficulty = 'Mythic+';
                                    break;
                                case 'эпохальный':
                                    product.difficulty = 'Mythic';
                                    break;
                                case 'героический':
                                    product.difficulty = 'Heroic';
                                    break;
                                default:
                                    product.difficulty = '';
                                    break;
                            }
                        } else {
                            product.difficulty = '';
                        }

                        //NAME
                        temp = $(".tc-desc-text")[i.toString()]['children'][0]['data']; //name 0
                        product.name = temp.replace(/'/g, "");
                        // var t = await arrayf.getProductByName(temp);
                        // if (t.length > 0) {
                        //     continue;
                        // }
                        // FACTION
                        temp = $(".tc-side-inside")[i.toString()]['children'][0]['data']; //faction
                        product.faction = temp;
                        // SELLER
                        temp = $(".pseudo-a")[(2 * i + 1).toString()]['children'][0]['data']; //seller
                        product.seller = temp; //to do
                        //SELLER ID
                        var sellerId = $(".pseudo-a")[i.toString()]['attribs']['data-href'].split('/'); //seller id
                        sellerId = sellerId[sellerId.length - 2];
                        //PRICE
                        temp = $(".tc-price")[(i + 1).toString()]['attribs']['data-s']; //price 1
                        product.cost = Number(temp);




                        // //
                        //is seller exist
                        var seller = await arrayf.getSellerByName(product.seller);
                        if (!seller.length) {
                            await arrayf.generationSellers(sellerId);
                            product.seller = sellerId;
                        } else {
                            product.seller = sellerId;
                        }
                        //is type exist
                        var type = await arrayf.getTypeByName(product.type);
                        if (!type.length) {
                            var type = new Type(null, product.type);
                            await arrayf.insertType(type);
                        } else {
                            product.type = type[0].id;
                        }
                        //is faction exist
                        var faction = await arrayf.getFactionByName(product.faction);
                        if (!faction.length) {
                            var faction = new Faction(null, product.faction);
                            await arrayf.insertFaction(faction);
                        } else {
                            product.faction = faction[0].id;
                        }
                        //is difficulty exist
                        var difficulty = await arrayf.getDifficultyByName(product.difficulty);
                        if (!difficulty.length) {
                            var d = new Difficulty(null, product.difficulty);
                            await arrayf.insertDifficulty(d);
                        } else {
                            product.difficulty = difficulty[0].id;
                        }
                        var iddt = await arrayf.isExistProduct(product.id);
                        if (iddt.length > 0) {
                            continue;
                        }
                        var result = await query.insertProductG(product);
                        console.log('Added '.green + lSpace++);
                        // process.stdout.write("\r\x1b[K");
                        // process.stdout.write('Added '.green + lSpace++);
                        // await arrayf.getProduct(result);
                        //


                    }
                    resolve();
                });

            })

        })
        await run.then(() => {
            console.log();
        });

        return 1;
    },
    // async generationProductsB(page, link) {
    //     var run = new Promise(function (resolve, reject) {
    //         var temp;
    //         var product = new Product(null, null, null, null, true, null, null, null, null);
    //         var body = page.toString();
    //         let $ = cheerio.load(body);
    //         $ = cheerio.load($('.mb20').html());
            
    //         var tk = 0;
    //         for (var k = 0; k < $('.offer').length; k++, tk++) {
    //             console.dir($('h3')[k.toString()]['children'][0]['children'][0]['data']);
    //         }

    //         var inx = 1;
    //         for (var i = 0; inx < $('.tc-item').length; inx++, i++) {
    //             inx++;
    //             process.stdout.write("\r\x1b[K");
    //             process.stdout.write("[");
    //             for (let j = 0; j < inx; j += link.n / 100) {
    //                 process.stdout.write("=");
    //             }
    //             for (let j = 0; j < link.n - inx - 1; j += link.n / 100) {
    //                 process.stdout.write(' ');
    //             }
    //             process.stdout.write("]");
    //             // PRODUCT ID
    //             var sellerId = $(".tc-item")[i.toString()]['attribs']['href'].split('='); //seller id
    //             product.id = Number(sellerId[sellerId.length - 1]);
    //             var iddt = await arrayf.isExistProduct(product.id);
    //             if (iddt.length > 0) {
    //                 continue;
    //             }
    //             // DESCRIPTIPN
    //             product.description = await Generation.getDescription(product.id);
    //             // TYPE
    //             product.type = link.type;

    //             //diff
    //             if (link.type == "Dungeons") {
    //                 temp = $(".tc-item")[i.toString()]['attribs']['data-f-difficulty']; // тип
    //                 switch (temp) {
    //                     case 'обычный':
    //                         product.difficulty = 'Normal';
    //                         break;
    //                     case 'эпохальный ключ':
    //                         product.difficulty = 'Mythic+';
    //                         break;
    //                     case 'эпохальный':
    //                         product.difficulty = 'Mythic';
    //                         break;
    //                     case 'героический':
    //                         product.difficulty = 'Heroic';
    //                         break;
    //                     default:
    //                         product.difficulty = '';
    //                         break;
    //                 }
    //             } else {
    //                 product.difficulty = '';
    //             }

    //             //NAME
    //             temp = $(".tc-desc-text")[i.toString()]['children'][0]['data']; //name 0
    //             product.name = temp.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
    //             var t = await arrayf.getProductByName(temp);
    //             if (t.length > 0) {
    //                 continue;
    //             }
    //             // FACTION
    //             temp = $(".tc-side-inside")[i.toString()]['children'][0]['data']; //faction
    //             product.faction = temp;
    //             // SELLER
    //             temp = $(".pseudo-a")[(2 * i + 1).toString()]['children'][0]['data']; //seller
    //             product.seller = temp; //to do
    //             //SELLER ID
    //             var sellerId = $(".pseudo-a")[i.toString()]['attribs']['data-href'].split('/'); //seller id
    //             sellerId = sellerId[sellerId.length - 2];
    //             //PRICE
    //             temp = $(".tc-price")[(i + 1).toString()]['attribs']['data-s']; //price 1
    //             product.cost = Number(temp);




    //             // //
    //             //is seller exist
    //             var seller = await arrayf.getSellerByName(product.seller);
    //             if (!seller.length) {
    //                 await arrayf.generationSellers(sellerId);
    //                 product.seller = sellerId;
    //             } else {
    //                 product.seller = sellerId;
    //             }
    //             //is type exist
    //             var type = await arrayf.getTypeByName(product.type);
    //             if (!type.length) {
    //                 var type = new Type(null, product.type);
    //                 await arrayf.insertType(type);
    //             } else {
    //                 product.type = type[0].id;
    //             }
    //             //is faction exist
    //             var faction = await arrayf.getFactionByName(product.faction);
    //             if (!faction.length) {
    //                 var faction = new Faction(null, product.faction);
    //                 await arrayf.insertFaction(faction);
    //             } else {
    //                 product.faction = faction[0].id;
    //             }
    //             //is difficulty exist
    //             var difficulty = await arrayf.getDifficultyByName(product.difficulty);
    //             if (!difficulty.length) {
    //                 var d = new Difficulty(null, product.difficulty);
    //                 await arrayf.insertDifficulty(d);
    //             } else {
    //                 product.difficulty = difficulty[0].id;
    //             }


    //             var result = await query.insertProductG(product);
    //             // await arrayf.getProduct(result);
    //             //




    //         }
    //         resolve();

    //     })
    //     await run.then(() => {
    //         console.log();
    //     })
    //     return 1;
    // },


    //
    //
    //
    async getSellers(n) {
        var result = Parse.seller(await query.getSellers(n));
        Print.table(result);
    },
    async getSellerByName(name) {
        var result = Parse.seller(await query.getSellerByName(name));
        return result;
        // Print.table(result);
    },
    async getSeller(id) {
        var result = Parse.seller(await query.getSeller(id));
        Print.table(result);

        // console.log(await query.indexTest1(false));
        // console.log(await query.indexTest1(true));
        return result;
    },
    async isExcistSeller(id) {
        var result = Parse.seller(await query.getSeller(id));
        return result;
    },
    async insertSeller(seller) {
        var result = await query.insertSeller(seller);
        await arrayf.getSeller(result);
        return result;
    },
    async removeSeller(id) {
        var test = await arrayf.getSeller(id);
        if (!test.length) {
            throw new Error("Doesn`t exist.".red);
        }
        var result = await query.removeSeller(id);
        console.log('Successfully removed'.green);
    },
    async searchSellers(seller) {
        var result = Parse.seller(await query.searchSellers(seller));
        Print.table(result);
    },
    async updateSeller(seller) {
        var isExist = await arrayf.getSeller(seller.id);
        if (!isExist.length) {
            throw new Error("Product doesn`t exist".red);
        }
        seller.name = seller.name ? seller.name : isExist[0].name;
        seller.email = seller.email ? seller.email : isExist[0].email;
        var result = await query.updateSeller(seller);
        await arrayf.getSeller(result);
        return result;
    },
    async generationSellers(link) {
        // for (link = 1408574; link < 3050000; link = link + 3) { //1382673
            // process.stdout.write("\r\x1b[K");
            // process.stdout.write("[");
            // for (let j = 0; j < link; j += 3000000 / 100) {
            //     process.stdout.write("=");
            // }
            // for (let j = 0; j < 3000000 - link - 1; j += 3000000 / 100) {
            //     process.stdout.write(' ');
            // }
            // process.stdout.write("]" + link);
            var sLink = 'https://funpay.ru/en/users/' + link + '/';
            var run = new Promise(function (resolve, reject) {
                var temp;
                var seller = new Seller(null, null, null, null, null, null);

                https.get(sLink, async (res) => {
                    // DATA
                    let body = [];
                    res.on('data', function (chunk) {
                        body.push(chunk);
                    });
                    // END
                    res.on('end', async () => {
                        body = Buffer.concat(body).toString();
                        let $ = cheerio.load(body);
                        if (!$('.profile-header')['0']) {
                            resolve();
                            return;
                        }
                        $ = cheerio.load($('.profile-header').html());


                        // ID
                        seller.id = Number(link);
                        var t = await arrayf.isExcistSeller(seller.id);
                        if (t.length > 0) {
                            resolve();
                            return;
                        }
                        // NAME
                        temp = $(".mr4")[0]['children'][0]['data'].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
                        seller.name = temp;
                        //Date  
                        temp = $(".text-nowrap")[0]['children'][0]['data'].split(',');
                        temp = temp[0].split(' ');
                        if (temp.length < 3) {
                            seller.reg_date = temp[0] + ' ' + temp[1] + ' ' + '2021';
                        } else {

                            seller.reg_date = temp[0] + ' ' + temp[1] + ' ' + temp[2];
                        }
                        if ((await arrayf.getSellerByName(seller.name)).length <= 0) {
                            var result = await query.insertSellerG(seller);
                            try {

                                await arrayf.generationReviewsB(body, result);

                            } catch (e) {
                                console.error(e);
                            }
                            // await arrayf.getSeller(result);

                        }
                        //

                        resolve();
                    });

                })

            })
            await run.then(() => {});
        // }
        return 1;
    },
    exit() {
        console.log("\nSee you!\n".green);
        process.exit(0);
    }


}
var lSpace = 1;
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = arrayf;