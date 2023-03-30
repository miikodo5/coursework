const db = {
    'master': {
        host: '192.168.1.203',
        port: 5432,
        user: 'master',
        password: '123',
        database: 'coursework'
    },
    'salve': {
        host: '192.168.1.181',
        port: 5432,
        user: 'master',
        password: '123',
        database: 'coursework'
    }

};

module.exports = db;