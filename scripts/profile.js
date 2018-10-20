window.onload = function(){
    let url = window.location.href
    console.log(url)
    var id = getParameterByName('id', url)
    console.log(id)
    if(id){
      displayPage(id)
    }else{
      displayError()
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function displayPage(id){
  if(id == uid){
    dispSelf(id)
  }else{
    dispOther(id)
  }
}

function dispSelf(id){
  title = document.querySelector("title")
  title.innerHTML = 'My Profile'

}

function dispOther(){

}

function displayError(){
  console.log("error!")
}
