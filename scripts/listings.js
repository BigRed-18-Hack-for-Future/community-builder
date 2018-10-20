function getUserID() {
  console.log("user")
  console.log(firebase.auth().currentUser)
  return firebase.auth().currentUser.uid;
}


let login = document.querySelector("#logbtn");

login.addEventListener("click", e => {
  console.log("clicked log in", firebase.auth().currentUser.uid, firebase.auth().currentUser.email)
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
})

function whoIsLoggedIn () {
  console.log("logged in", firebase.auth().currentUser.uid, firebase.auth().currentUser.email);
}

let logout = document.querySelector("#logout")
logout.addEventListener("click", e => {
  firebase.auth().signOut().then(function() {
    console.log("logged out")
    // Sign-out successful.
  }).catch(function(error) {
    console.log(error)
    // An error happened.
  });
})

/*
let disp = document.querySelector("#info")
let info = document.querySelector("#infoHolder")
disp.addEventListener("click", e => {
  console.log(loggedIn())
})
*/


//returned true if someone is logged in
function loggedIn() {
  var user = firebase.auth().currentUser;
  if (user) {
    console.log(user)
    info.innerHTML = `${user.email} is logged in`
    info.innerHTML += `${user.uid} is logged in`
    return user.uid;
  } else {
    info.innerHTML = "no current user"
    return "";
  }
}

function loadCards() {
  let num = 1;
  firebase.database().ref("/posts").on('value', function(snapshot) {
    data = snapshot.val();
    for (key in data) {
      console.log("brandon", data[key])
      let column = document.createElement("div");
      column.classList.add("col");
      let card = document.createElement("div");
      card.id = "card" + num;
      card.classList.add("card");
      card.style = "width: 18rem; margin-top:40px;" //move to CSS style
      let img = document.createElement("img");
      img.id = "card"+num+"_img";
      img.classList.add("card-img-top");
      img.style = "height:286px; width:286px";
      img.alt = "brandon was here";
      firebase.storage().ref(key).getDownloadURL().then(function(url) {
      img.src = url;
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
      subtitle.innerHTML = data[key].title; //tags
      body.appendChild(subtitle);
      let text = document.createElement("p");
      text.id="card"+num+"_text";
      text.classList.add("card-text");
      text.innerHTML = data[key].desc;
      body.appendChild(text);
      let btn = document.createElement("a");
      btn.id="card"+num+"_btn";
      btn.href="#"
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

loadCards();
