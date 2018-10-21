window.onload = function() {
  let url = window.location.href
  console.log(url)
  var id = getParameterByName('id', url)
  console.log(id)
  if (id) {
    displayPage(id)
    loadCards(id)
  } else {
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

function displayPage(id) {
  if(id == uid){
    dispSelf(id)
  }else{
    dispOther(id)
  }
}



function dispSelf(id) {
  title = document.querySelector("title")
  title.innerHTML = 'My Profile'
  firebase.database().ref(`/user-info/${id}`).on('value', function(snapshot) {
    data = snapshot.val()
    console.log(data)
    document.querySelector("#name").innerHTML = data.name
    document.querySelector("#email").innerHTML = data.email
    document.querySelector("#pic").setAttribute('src', data.photo)
  })
}

function dispOther(id) {
  firebase.database().ref(`/user-info/${id}`).on('value', function(snapshot) {
    data = snapshot.val()
    console.log(data)
    document.querySelector("#name").innerHTML = data.name
    document.querySelector("#email").innerHTML = data.email
    document.querySelector("#pic").setAttribute('src', data.photo)
    title = document.querySelector("title")
    title.innerHTML = data.name
  })
}

function displayError() {
  console.log("error!")
}

function loadCards(id) {
  console.log(id)
  firebase.database().ref(`/user-posts/${id}`).on('value', function(snapshot) {
    data = snapshot.val()
    for (key in data) {
      let imgsrc = "assets/communitygarden.jpg"
      console.log("what is the key", key)
      firebase.storage().ref(key).getDownloadURL().then(function(url) {
        console.log("do i get here")
        imgsrc = url
        console.log("if so, src is", imgsrc)
        console.log(url)
      }).catch(function(error) {
        // Handle any errors
        console.log("error")
        //imgsrc = "assets/communitygarden.jpg"
      }).then(() => {
        document.querySelector("#cardListings").innerHTML +=
          `<div class="card m-3 d-flex justify-content-around" style="width:300px">
          <img class="card-img-top" src="${imgsrc}" alt="Card image">
          <div class="card-body">
          <h4 class="card-title">${data[key].title}</h4>
          <p class="card-text">${data[key].desc}</p>
          <a href="project.html?id=${key}" class="btn btn-primary">More Info</a>
          </div>
          </div>`
      })
    }
  })
}
