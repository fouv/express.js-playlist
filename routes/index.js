var express = require('express');
var router = express.Router();

var musicList = [
    { type: 'pop', title: 'Wannabe', artist: 'Spice Girls', year: 1996 },
    { type: 'pop', title: 'Thriller', artist: 'Michael Jackson', year: 1983 },
    { type: 'rock', title: 'God Save the Queen', artist: 'The Sex Pistols', year: 1977 },
    { type: 'R&B', title: 'Be with you', artist: 'Mary J. Blige', year: 2005 },
    { type: 'pop', title: 'Shape of you', artist: 'Ed Sheeran', year: 2017 },
    { type: 'rock', title: 'Shockwave', artist: 'Liam Gallagher', year: 2017 },
    { type: 'R&B', title: 'Empire State of Mind', artist: 'Alicia keys', year: 2009 },
    { type: 'rock', title: 'Numb', artist: 'Linkin park', year: 2003 },
    { type: 'R&B', title: 'Shut up', artist: 'The Black Eyed Peas', year: 2009 }
]

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.choiceList == undefined) {
        req.session.choiceList = [];
    }
    res.render('index', { musicList });
});
/* GET My playlist */
router.get('/my-playlist', function(req, res, next) {
    req.session.choiceList = req.query.choiceList;
    res.render('playlist', { musicList, choiceList: req.session.choiceList });
});

/* Add music to playList */

router.get('/add-title', function(req, res, next) {
    console.log(req.query);
    req.session.choiceList.push({
        title: req.query.title,
        artist: req.query.artist,
        year: req.query.year
    })
    res.render('playlist', { musicList, choiceList: req.session.choiceList });
});

router.post('/delete-title', function(req, res, next) {
    req.session.choiceList.splice(req.body.position, 1)
    res.render('playlist', { choiceList: req.session.choiceList });
});

module.exports = router;