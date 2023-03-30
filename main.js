const Router = require("./addons/enter.js");
const commands = require("./addons/commands");
const prompt = require('prompt-sync')();
const Input = require('./addons/input');
const Links = require('./addons/links');

const Product = new require('./tables/product');
const Seller = new require('./tables/seller');
const Review = new require('./tables/review');
const Type = new require('./tables/type');
const Faction = new require('./tables/faction');
const Difficulty = new require('./tables/difficulty');

// async function teee() {
//     var link = Input.Gen();
//     setInterval(async() => {
//         await Router.handle("product -g", link);
        
//     }, 1000 * 60 * 10);
// }
// teee();

async function RUN() {
    let run = true;//false
    console.log('You could enter "help" to see all of commands');
    while (run) {
        var input = prompt('>');
        const parts = input.split(' ');
        const command = (parts.slice(0, 2)).join(' ');
        switch (command) {
            //reviews
            case commands.reviews.l:
                try {
                    var n = Input.Amount();
                    await Router.handle("review -l", n); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.reviews.id:
                var id = Input.Id();
                try {
                    await Router.handle("review -id", id); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.reviews.i:

                try {
                    var review = Input.ReviewI();
                    await Router.handle("review -i", review); //+
                } catch (e) {
                    console.log(e.message);
                }

                break;
            case commands.reviews.r:
                try {
                    var id = Input.Id();
                    await Router.handle("review -r", id); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.reviews.s:
                try {
                    var review = Input.ReviewS();
                    await Router.handle("review -s", review); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.reviews.g:
                try {

                    await Router.handle("review -g", 2002000); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
                //factions
            case commands.factions.l:
                try {
                    await Router.handle("faction -l"); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.factions.id:
                try {
                    var id = Input.Id();
                    await Router.handle("faction -id", id); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.factions.i:
                try {
                    var faction = Input.FactionI();
                    await Router.handle("faction -i", faction); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.factions.r:
                try {
                    var id = Input.Id();
                    await Router.handle("faction -r", id); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
                //difficulties
            case commands.difficulties.l:
                try {
                    await Router.handle("difficulty -l"); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.difficulties.id:
                try {
                    var id = Input.Id();
                    await Router.handle("difficulty -id", id); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.difficulties.i:
                try {
                    var d = Input.D();
                    await Router.handle("difficulty -i", d); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.difficulties.r:
                try {
                    var id = Input.Id();
                    await Router.handle("difficulty -r", id); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
                //types
            case commands.types.l:
                try {
                    await Router.handle("type -l"); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.types.id:
                try {
                    var id = Input.Id();
                    await Router.handle("type -id", id); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.types.i:
                try {
                    var type = Input.Type()
                    await Router.handle("type -i", type); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.types.r:
                try {
                    var id = Input.Id();
                    await Router.handle("type -r", id); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
                //products
            case commands.products.l:
                try {
                    var n = Input.Amount();
                    await Router.handle("product -l", n); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.products.id:
                try {
                    var id = Input.Id();
                    await Router.handle("product -id", id); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.products.i:
                try {
                    var product = Input.ProductI();
                    await Router.handle("product -i", product); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.products.r:
                try {
                    var id = Input.Id();
                    await Router.handle("product -r", id); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.products.u:
                try {
                    var id = Input.Id();
                    var product = Input.ProductU();
                    product.id = id;
                    await Router.handle("product -u", product); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.products.s:
                try {
                    var product = Input.ProductU();
                    await Router.handle("product -s", product); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.products.g: //!!!!!!!!!!!
                try {
                    if (link.link != null && link.n < 5000) {
                        var link = Input.Gen();await Router.handle("product -g", link);
                        // const run = new Promise(function (resolve, reject) {
                        // const intgen = setInterval(async () => {
                            
                        //     // if (link.n < 0) {
                        //     //     resolve();
                        //     // }

                        // }, 1000)
                        // run = false;

                        // })
                        // await run.then(() => {
                        //     console.log();
                        // });


                    } else {
                        console.log('Invalid type, or big amount.'.red);
                        console.dir(link);
                    }

                    // await Router.handle("product -g", 'https://funpay.ru/users/991599/'); //+

                } catch (e) {
                    console.log(e.message);
                }
                break;
                //sellers
            case commands.sellers.l:
                try {
                    var n = Input.Amount();
                    await Router.handle("seller -l", n); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.sellers.id:
                try {
                    var id = Input.Id();
                    await Router.handle("seller -id", id); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.sellers.i:
                try {
                    var seller = Input.SellerI();
                    await Router.handle("seller -i", seller); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.sellers.r:
                try {
                    var id = Input.Id();
                    await Router.handle("seller -r", id); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.sellers.u:
                try {
                    var id = Input.Id();
                    var seller = Input.SellerU();
                    seller.id = id;
                    await Router.handle("seller -u", seller); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.sellers.s:
                try {
                    var seller = Input.SellerS();
                    await Router.handle("seller -s", seller); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;
            case commands.sellers.g:
                try {

                    await Router.handle("seller -g", 1); //+
                } catch (e) {
                    console.log(e.message);
                }
                break;

            case commands.help.h:
                console.log("===========================================".yellow)
                console.log('commands:');
                console.log('product/seller/review/type/faction/difficulty');
                console.log("-l -- read");
                console.log("-id {id} -- read with id {id}");
                console.log("-s -- search");
                console.log("-i -- insert");
                console.log("-u -- update");
                console.log("-r -- remove")
                console.log("-g -- generate");
                console.log("exit -- disable the program")
                console.log("===========================================".yellow)
                break;

            default:
                Router.handle(commands.exit.e);
                run = false;
                break;
        }
    }
}

RUN();