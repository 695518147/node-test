const yaml = require('js-yaml');
const fs = require('fs');

var doc = yaml.load('greeting: hello\nname: world');

console.log(doc);

doc = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
console.log(doc);

