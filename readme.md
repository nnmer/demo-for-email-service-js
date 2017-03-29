Is a demo for the [Email service](http://github.com/nnmer/email-service)

It is built using ReactJS/ExpressJS.
Previous experience for both ReactJS/ExpressJS and React-Native(as it based on React) is reading docs, trying at "Hello World" level.

Setup
-----

Add a config.json file in rood directory with mailing credentials:

```
{
  "mailgunApikey":  "",
  "mailgunDomain":  "",
  "mandrillApikey": "",
  "sendgridApikey": "",
  "testEmailSendTo":""
}
```

run ```node path_to_server.js``` and open a browser at ```http://domainname:3001```

Testing
-------

Test with mocha and zombie
To run tests do:
```
npm run test
```


email template is from https://github.com/leemunroe/responsive-html-email-template

Other thoughts
--------------

In case of potential heavy usage of the underlying [Email service](http://github.com/nnmer/email-service) package need to:
- add a standalone runnable binary
- consider to have a wrapper on top of it with some kind of spolling (or Queueing system) as a middleware
- logging to external resources
- accept configuration from OS environment variables
