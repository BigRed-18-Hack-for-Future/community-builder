function getUserID() {
  console.log("user")
  console.log(firebase.auth().currentUser)
  return firebase.auth().currentUser.uid;
}

let login = document.querySelector("#logbtn")

login.addEventListener("click", e => {
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


let disp = document.querySelector("#info")
let info = document.querySelector("#infoHolder")
disp.addEventListener("click", e => {
  console.log(loggedIn())
})

let holder = document.querySelector("#holder")
console.log(holder)
firebase.database().ref("/posts").on('value', function(snapshot) {
  console.log(snapshot.val())
  data = snapshot.val()
  for (key in data) {
    holder.innerHTML += `${data[key].title}`
    console.log(key)

    //-LPHEglNt6a3bI0NAyNw
    firebase.storage().ref(key).getDownloadURL().then(function(url) {
      // Or inserted into an <img> element:
      // var img = document.getElementById('myimg');
      // img.src = url;
      holder.innerHTML += `<img src="${url}"/>`
    }).catch(function(error) {
      // Handle any errors
      holder.innerHTML += `<img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg"/>`
    })

  }
})
