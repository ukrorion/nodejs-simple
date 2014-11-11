/**
 * Created by ukrorion on 12.11.2014.
 */

var github = require('./github.js');

github.getRepos('ukrorion', function(repos){
  repos.forEach(function (repo) {
    console.log("Repository name: " + repo.name + " user name " + repo.owner.login)
  });
});