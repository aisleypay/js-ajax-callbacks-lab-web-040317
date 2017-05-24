function handlebarsSetup() {
  //put any handlebars setup in here
  Handlebars.registerPartial("userDetails", $("#user-details-partial").html())
}

$(document).ready(function (){
  handlebarsSetup()
});

function searchRepositories(){
  const search = $("#searchTerms").val()

  $.get(`https://api.github.com/search/repositories?q=${search}`, function(data){
    const src = document.getElementById("repository-template").innerHTML
    var template = Handlebars.compile(src);
    var repoList = template(data.items)
    document.getElementById("results").innerHTML = repoList
  }).fail(displayError())
}

function displayError(){
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function showCommits(element){
   var owner = element.dataset.owner
   var repo = element.dataset.repository

  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`, function(data){
    const src = document.getElementById("commits-template").innerHTML
    var template = Handlebars.compile(src);
    var dataList = template(data)
    document.getElementById("details").innerHTML = dataList
  }).fail(displayError())
}
