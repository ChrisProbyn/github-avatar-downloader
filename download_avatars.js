var request = require('request');
var fs = require('fs');

var secret = require('./secrets');  //allows use of my gitHub token that is located in a file not tracked by github
var args = process.argv.slice(2);   //allows use of command line input



//  This function will take in info of a github repo using the github api.
//  It calls a callback function that is determined elsewhere
function getRepoContributors(repoOwner, repoName, callback) {
  //options object that has url, user-agent, and authorization for the github api
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secret.GITHUB_TOKEN
    },
  };
  if(args[0] && args[1]) {
    //requests with the options object and deserializes the body.
    //Then calls the callback function with the deserilized info
    request(options, function(error, response, body) {
      var resulting = JSON.parse(body);
      callback(error,resulting);
    });
  } else {
    console.log("Program requires the repo owner and repo to be inputed");
  }
}

//  this function will download an image given a url and a name for the file
//  requires that there is an avatars folder to put the images in
function downloadImageByURL(url, fileName){
  request.get(url)
  .pipe(fs.createWriteStream("avatars/" + fileName + ".jpg"));
}

// invoking the function with the command line strings
// callback function takes in two inputs: the error and deserilized contributors of a repo
getRepoContributors(args[0], args[1], function(err, contributors) {
  // loops through the resulting data and downloads an image at the index url and names it the indices login name
  for(var contributor of contributors){
    downloadImageByURL(contributor.avatar_url , contributor.login);
  }

});
