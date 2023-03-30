var cheerio = require('cheerio');
const https = require('https');

module.exports = {
    async getDescription(id) {
        var link = 'https://funpay.ru/en/lots/offer?id=' + id.toString();
        var descr;
        var run = new Promise(function (resolve, reject) {
            https.get(link, (res) => {
                // DATA
                let body = [];
                res.on('data', function (chunk) {
                    body.push(chunk);
                });
                // END
                res.on('end', () => {
                    body = Buffer.concat(body).toString();
                    var $ = cheerio.load(body);
                    $ = cheerio.load($('.param-list').html());
                    descr = $(".param-item")['4']['children'][1]['children'][0]['data'];
                    resolve();
                });

            })

        })
        await run;
        if (!descr)
        {
            descr = '';
            }
        return descr.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
    }
}