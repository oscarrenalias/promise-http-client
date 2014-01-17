var PromiseHttpClient = require("../lib/main"),
    client = new PromiseHttpClient();

console.log("This will dump Yahoo.com's front page to the console, please wait");

client.get("http://www.yahoo.com").then(function(body) {
    console.log(body);
}).fail(function(err) {
    console.log("There was an error retrieving the page: " + err);
});