const server = {
    hostname: 'localhost',
    port: 8000,
}


const Express = require('express');
const Consolidate = require('consolidate');
const Path = require('path');


const Database = require('../database/db-queries');
const config = require('../database/db-config');



/*================================================================================================================
Variables
==================================================================================================================*/

const app = Express();
const db = new Database(config);

// path
const views = Path.join(__dirname, 'views');


/*================================================================================================================
Main
==================================================================================================================*/

app.use(Express.static('public'));
app.engine('html', Consolidate.swig);
app.set('views', views);
app.set('view engine', 'html');
// app.use(Express.static(path.join(__dirname, "js")));

const jsonParser = Express.json();



// http
app.get("/", async (req, res) => {
    res.render('index');
});

app.post("/faction", jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const result = await db.analyze();
    res.end(JSON.stringify(result));
});

app.post("/years", jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const result = await db.analyze2();
    res.end(JSON.stringify(result));
});

app.post("/years2", jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const result = await db.analyze2();
    res.end(JSON.stringify(result));
});

app.post("/price", jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const result = await db.analyze3();
    res.end(JSON.stringify(result));
});

app.post("/price2", jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const result = await db.analyze4();
    res.end(JSON.stringify(result));
});

app.post("/index", jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const result = {
        'true': await db.indexTest1(true),
        'false': await db.indexTest1(false)
    };
    res.end(JSON.stringify(result));
});

app.post("/index2", jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const result = {
        'true': await db.indexTest2(true),
        'false': await db.indexTest2(false)
    };
    res.end(JSON.stringify(result));
});


app.use((err, req, res, next) => {
    console.log(`On error: ${err.message}`);
});

// start
app.listen(server.port, server.hostname, () => {
    console.log(`The server is listening at http://${server.hostname}:${server.port}`);
});