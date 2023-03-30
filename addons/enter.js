const Controller = require("../logic/controller");
const Router = require("../logic/router");
const commands = require("./commands.js");

const router = new Router();
router.use(commands.reviews.l, Controller.getReviews);//+
router.use(commands.reviews.id, Controller.getReview); //+
router.use(commands.reviews.i, Controller.insertReview); //+
router.use(commands.reviews.r, Controller.removeReview); //+
router.use(commands.reviews.u, Controller.updateReview); //+
router.use(commands.reviews.s, Controller.searchReviews); //+
router.use(commands.reviews.g, Controller.generationReviews);
router.use(commands.exit.e, Controller.exit);
router.use(commands.exit.c, Controller.exit);
router.use(commands.help.h, Controller.exit);

router.use(commands.factions.l, Controller.getFactions); //+
router.use(commands.factions.id, Controller.getFaction); //+
router.use(commands.factions.i, Controller.insertFaction); //+
router.use(commands.factions.r, Controller.removeFaction); //+
router.use(commands.factions.u, Controller.updateFaction);
router.use(commands.factions.s, Controller.searchFactions);
router.use(commands.factions.g, Controller.generationFactions);

router.use(commands.difficulties.l, Controller.getDifficulties); //+
router.use(commands.difficulties.id, Controller.getDifficulty); //+
router.use(commands.difficulties.i, Controller.insertDifficulty); //+
router.use(commands.difficulties.r, Controller.removeDifficulty); //+
router.use(commands.difficulties.u, Controller.updateDifficulty);
router.use(commands.difficulties.s, Controller.searchDifficultys);
router.use(commands.difficulties.g, Controller.generationDifficulties);

router.use(commands.types.l, Controller.getTypes); //+
router.use(commands.types.id, Controller.getType); //+
router.use(commands.types.i, Controller.insertType); //+
router.use(commands.types.r, Controller.removeType); //+
router.use(commands.types.u, Controller.updateType);
router.use(commands.types.s, Controller.searchTypes);
router.use(commands.types.g, Controller.generationTypes);

router.use(commands.products.l, Controller.getProducts); //+
router.use(commands.products.id, Controller.getProduct); //+
router.use(commands.products.i, Controller.insertProduct); //+
router.use(commands.products.r, Controller.removeProduct); //+
router.use(commands.products.u, Controller.updateProduct); //+
router.use(commands.products.s, Controller.searchProducts); //+
router.use(commands.products.g, Controller.generationProducts);

router.use(commands.sellers.l, Controller.getSellers); //+
router.use(commands.sellers.id, Controller.getSeller); //+
router.use(commands.sellers.i, Controller.insertSeller); //+
router.use(commands.sellers.r, Controller.removeSeller); //+
router.use(commands.sellers.u, Controller.updateSeller); //+
router.use(commands.sellers.s, Controller.searchSellers); //+
router.use(commands.sellers.g, Controller.generationSellers);

module.exports = router;