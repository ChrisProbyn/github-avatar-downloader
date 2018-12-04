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
  request(options, function(err, res, body) {
    var resulting = JSON.parse(body);
    callback(err,resulting);
  });
}


function downloadImageByURL(url, filepath){
  request.get(url)
  .pipe(fs.createWriteStream("avatars/" + filepath + ".jpg"));
}

getRepoContributors("jquery", "jquery", function(err, result) {
  for(var i of result){
     downloadImageByURL((i.avatar_url), i.login)
    }
});
