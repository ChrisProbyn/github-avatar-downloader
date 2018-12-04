var request = require('request');
var fs = require('fs');
var secret = require('./secrets');

function getRepoContributors(repoOwner, repoName, callback) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secret.GITHUB_TOKEN
    },
  };

// request.get(options.url)
//        .on('response', function (response) {
//         var data = JSON.parse(response).headers["avatar_url"]

//        });


  request(options, function(err, res, body) {


    var resulting = JSON.parse(body);
    var list = [];
    for(var i of resulting){
     list.push(i.avatar_url);
    }



    callback(err,list);
  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
