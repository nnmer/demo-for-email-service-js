'use strict';

let express = require('express');
let router  = express.Router();
let MailService = require('email-service');
let mailConfig  = require('../../config.json');
let app = require('../app');

router.get('/', function(req, res, next) {
    res.render('index.hbs');
});
router.post('/send', function(req, res, next) {
    if (!req.body
        || !req.body.emailFrom
        || !req.body.emailTo
        || !req.body.subject
        || !req.body.message){
            res.statusMessage = 'not correct data submitted'
            res.sendStatus(400).send();
    }
    let mailer = new MailService({
        services: {
            mailgun: {
                apiKey: mailConfig.mailgunApikey+'123',
                domain: mailConfig.mailgunDomain,
            },
            sendgrid: {
                apiKey: mailConfig.sendgridApikey
            },
            mandrill: {
                apiKey: mailConfig.mandrillApikey
            }
        }
    });

    res.render('email.hbs', {message: req.body.message}, function(err, html){
        mailer.send(req.body.emailFrom, req.body.emailTo, req.body.subject, html)
            .then(()=>{
                res.sendStatus(200).send();
            })
            .catch((e)=>{
                res.statusMessage = e.toString();
                res.sendStatus(500).send();
            })
    });
});

module.exports = router;