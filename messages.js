const Mercury = require('@postlight/mercury-parser');

var url = process.argv[2];

Mercury.parse(url).then(result => console.log(result.content));