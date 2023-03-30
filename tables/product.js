class Product {
    constructor(id, name, description, cost, active, seller, faction, difficulty, type) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.difficulty = difficulty;
        this.faction = faction;
        this.type = type;
        this.cost = cost;
        this.active = active;
        this.seller = seller;
    }
}
module.exports = Product;