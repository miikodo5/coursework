class Review {
    constructor(id, comment, date, product_cost, mark, seller) {
        this.id = id;
        this.comment = comment;
        this.date = date;
        this.product_cost = product_cost;
        this.mark = mark;
        this.seller = seller;
    }
}
module.exports = Review;