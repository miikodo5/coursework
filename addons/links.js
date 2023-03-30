var cheerio = require('cheerio');
const https = require('https');

const types = {
    'Gold': 'https://funpay.ru/en/chips/2/',
    'Accounts': 'https://funpay.ru/en/lots/13/',
    'Raids': 'https://funpay.ru/en/lots/339/',
    'Dungeons': 'https://funpay.ru/en/lots/340/',
    'Boosting': 'https://funpay.ru/en/lots/344/',
    'PvP': 'https://funpay.ru/en/lots/341/',
    'Achievements': 'https://funpay.ru/en/lots/342/',
    'Mounts': 'https://funpay.ru/en/lots/343/',
    'Shadowlands': 'https://funpay.ru/en/lots/707/',
    'Other': 'https://funpay.ru/en/lots/345/'
}
module.exports = types;

