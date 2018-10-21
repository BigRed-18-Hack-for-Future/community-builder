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

// function loadCards(id) {
//   console.log(id)
//   firebase.database().ref(`/user-posts/${id}`).on('value', function(snapshot) {
//     data = snapshot.val()
//     for (key in data) {
//       let imgsrc = "assets/communitygarden.jpg"
//       firebase.storage().ref(key).getDownloadURL().then(function(url) {
//         console.log("do i get here")
//         imgsrc = url
//         console.log(url)
//       }).catch(function(error) {
//         // Handle any errors
//         console.log("error")
//         //imgsrc = "assets/communitygarden.jpg"
//       }).then(() => {
//
//       })
//       document.querySelector("#cardListings").innerHTML +=
//         `<div class="card m-3 d-flex justify-content-around" style="width:300px">
//         <img class="card-img-top" src="${imgsrc}" alt="Card image">
//         <div class="card-body">
//         <h4 class="card-title">${data[key].title}</h4>
//         <p class="card-text">${data[key].desc}</p>
//         <a href="project.html?id=${key}" class="btn btn-primary">More Info</a>
//         </div>
//         </div>`
//     }
//   })
// }

function loadCards(id) {
  let num = 1;
  console.log(id)
  firebase.database().ref(`/user-posts/${id}`).on('value', function(snapshot) {
    data = snapshot.val()
    for (key in data) {
        let column = document.createElement("div")
        column.classList.add("col")
        let card = document.createElement("div")
        card.id = "card" + num
        card.classList.add("card")
        card.style = "width: 18rem; margin-top:40px;" //move to CSS style
        let img = document.createElement("img")
        img.id = "card"+num+"_img"
        img.classList.add("card-img-top")
        img.alt = "image broken"
        firebase.storage().ref(key).getDownloadURL().then(function(url) {
        img.src = url
      }).catch(function(error) {
        // Handle any errors
        img.src = "assets/communitygarden.jpg";
      })

      let body = document.createElement("div");
      body.id="card"+num+"_body";
      body.classList.add("card-body");
      let title = document.createElement("h5");
      title.id="card"+num+"_title";
      title.classList.add("card-title");
      title.innerHTML = data[key].title;
      body.appendChild(title);
      let subtitle = document.createElement("h6");
      subtitle.id="card"+num+"_sub";
      subtitle.class = ("card-subtitle mb-2 text-muted");
      subtitle.innerHTML = data[key].tags;
      body.appendChild(subtitle);
      let text = document.createElement("p");
      let short = data[key].desc
      if (short.length > 60){
        short = short.slice(0, 57);
        short += "..."
      }
      text.id="card"+num+"_text";
      text.classList.add("card-text");
      text.innerHTML = short;
      body.appendChild(text);
      let btn = document.createElement("a");
      btn.id="card"+num+"_btn";
      btn.href=`project.html?id=${key}`
      btn.classList.add("btn");
      btn.classList.add("btn-primary");
      btn.innerHTML = "More Info";
      body.appendChild(btn);

        card.appendChild(img);
        card.appendChild(body);
        column.appendChild(card);
        document.getElementById("cardListings").appendChild(column);
        num += 1;

    }
  })
}
