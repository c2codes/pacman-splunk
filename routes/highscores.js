var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Database = require('../lib/database');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date());
    next();
})

router.get('/list', urlencodedParser, async (req, res, next) => {
    console.log('[GET /highscores/list]');

    try {
        // Get the database instance
        const db = await Database.getDb(req.app); // Assuming getDb returns a Promise

        // Retrieve the top 10 high scores
        const col = await db.collection('highscore');
        const docs = await col.find({}).sort([['score', -1]]).limit(10).toArray();

        const result = docs.map(item => ({
            name: item.name,
            cloud: item.cloud,
            zone: item.zone,
            host: item.host,
            score: item.score
        }));

        res.json(result);
    } catch (err) {
        console.error(err);
        next(err); // Pass the error to the next middleware
    }
});

router.post('/', urlencodedParser, async (req, res, next) => {
    try {
        console.log('[POST /highscores] body =', JSON.stringify(req.body),
                    ' host =', req.headers.host,
                    ' user-agent =', req.headers['user-agent'],
                    ' referer =', req.headers.referer);

        const userScore = parseInt(req.body.score, 10);
        const userLevel = parseInt(req.body.level, 10);

        // Get the database instance
        const db = await Database.getDb(req.app); //  getDb is now a Promise-based method

        console.log("DB good");

        // Insert high score with extra user data
        const result = await db.collection('highscore').insertOne({
            name: req.body.name,
            cloud: req.body.cloud,
            zone: req.body.zone,
            host: req.body.host,
            score: userScore,
            level: userLevel,
            date: new Date(), // Use new Date() for current timestamp
            referer: req.headers.referer,
            user_agent: req.headers['user-agent'],
            hostname: req.hostname,
            ip_addr: req.ip
        }, {
            writeConcern: { w: 'majority', j: true, wtimeout: 10000 }
        });

        console.log('Successfully inserted highscore');

        res.json({
            name: req.body.name,
            zone: req.body.zone,
            score: userScore,
            level: userLevel,
            rs: 'success'
        });
    } catch (err) {
        console.error(err);
        res.json({
            name: req.body.name,
            zone: req.body.zone,
            score: userScore,
            level: userLevel,
            rs: 'error'
        });
        next(err); // Call next with the error for further handling if necessary
    }
});

module.exports = router;
