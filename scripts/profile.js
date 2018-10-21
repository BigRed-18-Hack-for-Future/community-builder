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
  dispOther(id)
}



function dispSelf(id){
  title = document.querySelector("title")
  title.innerHTML = 'My Profile'

}

function dispOther(id){
  firebase.database().ref(`/user-info/${id}`).on('value', function(snapshot) {
    data = snapshot.val()
    console.log(data)
    document.querySelector("#name").innerHTML = data.name
    document.querySelector("#email").innerHTML = data.email
    document.querySelector("#pic").setAttribute('src', data.photo)
    title = document.querySelector("title")
    title.innerHTML = data.name
  })
  firebase.storage().ref(id).getDownloadURL().then(function(url) {
    // Or inserted into an <img> element:
    var img = document.getElementById('cardimg')
    img.src = url
  }).catch(function(error) {
    // Handle any errors
    var img = document.getElementById('cardimg')
    img.src = "https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg"
  })
}

function displayError(){
  console.log("error!")
}
