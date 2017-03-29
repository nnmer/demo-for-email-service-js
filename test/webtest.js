var assert  = require('assert');
var app     = require('../server/app');
var http    = require('http');
var Browser = require('zombie');
var configMailer = require('../config.json');

describe('Sending page test',function() {

    before(function(){
        this.server = http.createServer(app).listen(3002);
        this.browser = new Browser({ site: 'http://localhost:3002' });
    });

    before(function(done){
        this.browser.visit('/',done);
    })

    it('should show a page',function(){
        assert.ok(this.browser.success);
    });

    it('should return 200 when call /send',function(done){
        this.timeout(0);

        this.browser.fetch('/send',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                emailTo:    configMailer.testEmailSendTo,
                emailFrom:  'abc@test.com',
                subject:    'Test suit subject',
                message:    'Test content'
            })
        })
            .then(function(response) {
                console.log('Status code:', response.status);
                assert.equal(response.status, 200);
            })
            .then(done,done)
    })

    after(function(done){
        this.server.close(done);
    })
});