Is a demo for the [Email service](http://github.com/nnmer/email-service)

Setup
-----

Add a config.json file in rood directory with mailing credentials:

```
{
  "mailgunApikey":  "",
  "mailgunDomain":  "",
  "mandrillApikey": "",
  "sendgridApikey": ""
}
```

Testing
-------

Test with mocha and zombie
To run tests do:
```
npm run test
```


email template is from https://github.com/leemunroe/responsive-html-email-template
