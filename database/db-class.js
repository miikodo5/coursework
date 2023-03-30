const {
    Pool
} = require("pg");


class database {

    constructor(db_config) {
        this.pool = null
        this.conf = db_config['master'];
        this.confS = db_config['salve'];
    }


    async connect(host) {
        try {
            this.pool = await new Pool(host);
        } catch (ex) {
            console.log(`Error connection.\n${ex.stack}`);
        }
    }
    async disconnected() {
        try {
            await this.pool.end();
        } catch (ex) {
            console.log(`Error disconnection.\n${ex.stack}`);
        }
    }

    async queryConnect(query, host) {
        let result = null;
        try {
            await this.connect(host);
            result = await this.pool.query(query);
        } catch (ex) {
            console.error(`${ex.stack}`);
        } finally {
            await this.disconnected();
            return result;
        }
        
    }

    async query(query) {
        const res_m = await this.queryConnect(query, this.conf);
        if (!res_m) {
            const res_s = await this.queryConnect(query, this.confS);
            if (!res_s) {
                return null;
            }
            return res_s;
        }
        return res_m;

    }
}

module.exports = database;