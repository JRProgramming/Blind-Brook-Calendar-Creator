var express = require('express');
var router = express.Router();


const {getStudentClassesAndType} = require('../src/js/getStudentClassesAndType');

const {generateCal} = require('../ical/src/js/gen.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('error', {
        errorTitle: "An Error occurred",
        errorMessage: "No data was submitted."
    });
});
router.post('/', function (req, res, next) {
    getStudentClassesAndType(req.body).then(({studentClasses,type}) => {
        let ical = "";
        try {
            ical = generateCal(studentClasses,type,req.body["lunch"] === "on");
            res.setHeader('Content-disposition', `attachment; filename=bbcalendar${new Date().getFullYear()}.ics`);
            res.setHeader('Content-type', "text/calendar");
            res.send(ical.toString());
        } catch (e) {
            console.error(e.stack);
            res.render('error', {
                errorTitle: "An Error occurred",
                errorMessage: "An unknown error occurred. Please try again. If the problem persists contact me."
            });
        }
    }).catch(err => {
        console.error(JSON.stringify(err));
        res.render('error', err);
    });
});

module.exports = router;
