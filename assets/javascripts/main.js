$(function(){
  console.log('main js');
  
  var orgName = 'womenwhocodedc';
  var requri   = 'https://api.github.com/orgs/'+orgName;
  var repouri  = 'https://api.github.com/users/'+orgName+'/repos';

  requestJSON(requri, function(gitData) {
    
    if(gitData.message == "Not Found" || orgName == '') {
      $('#ghAPIData').html("<h2>No repositories found</h2>");
    }
    
    else {
      // else we have a repo and we display their info

      console.log(gitData)      

      var fullname   = gitData.name;
      var orgName   = gitData.login;
      var aviurl     = gitData.avatar_url;
      var profileurl = gitData.html_url;
      var description = gitData.description;
      var location   = gitData.location;
      var followersnum = gitData.followers;
      var followingnum = gitData.following;
      var reposnum     = gitData.public_repos;
      
      if(fullname == undefined) { fullname = orgName; }
      
      var outhtml = '<h2>'+description+'</h2>';

      outhtml = outhtml + '<h3>Listing of repositories under <a href="'+profileurl+'" target="_blank">'+orgName+'</a> ('+reposnum+')</h3></span>';
      
      outhtml = outhtml + '<div class="repolist clearfix">';
      
      
      var repositories;
      $.getJSON(repouri, function(gitData){
        repositories = gitData;   
        outputPageContent();                
      });          
      
      function outputPageContent() {
        if(repositories.length == 0) { 
          outhtml = outhtml + '<p>No repos!</p></div>'; 
        }
        else {
          $.each(repositories, function(index) {
            outhtml = outhtml + '<li><h4><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a><h4></li>';
          });
          outhtml = outhtml + '</ul></div>'; 
        }
        $('#ghAPIData').html(outhtml);
      } // end outputPageContent()
    } // end else statement
  }); // end requestJSON Ajax call
});

function requestJSON(url, callback) {
  $.ajax({
    url: url,
    complete: function(xhr) {
      callback.call(null, xhr.responseJSON);
    }
  });
}