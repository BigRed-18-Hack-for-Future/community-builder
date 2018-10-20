var auth = false
var uid = loggedIn()


window.setTimeout (function () {
  console.log("WINDOW ON LOAD")
  loggedIn();
}, 1000);

//returned true if someone is logged in
function whoIsLoggedIn () {
  console.log("logged in", firebase.auth().currentUser.uid, firebase.auth().currentUser.email);
}

function loggedIn() {
  var user = firebase.auth().currentUser

  var usrinfo = document.querySelector("#usrinfo")
  var logbtn = document.querySelector("#logbtn")
  var logout = document.querySelector("#logout")
  var current = document.querySelector("#current")

  console.log("called loggedIn")
  if (user) {
    console.log("user is true")
    logbtn.style.display = 'none'
    logout.style.display = 'initial'
    current.style.display = 'initial'
    current.setAttribute('href', `profile.html?id=${user.uid}`)
    current.innerHTML = user.displayName
    auth = true
    uid = user.uid
    console.log(uid)
    return user.uid;
  } else {
    console.log("user is false")
    console.log(logout)
    console.log(current)
    logout.style.display = 'none'
    current.style.display = 'none'
    logbtn.style.display = 'initial'
    auth = false
    return "";
  }
}

loggedIn()

// //if logged in show log out button
// if(loggedIn()){
//   console.log(currentUser)
// } else{
//   console.log("no one")
// }

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
  }).then(function(){ loggedIn()}).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code
    var errorMessage = error.message
    // The email of the user's account used.
    var email = error.email
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential
    // ...
  });
})

let logout = document.querySelector("#logout")
logout.addEventListener("click", e => {
  firebase.auth().signOut().then(function() {
    auth = false
    console.log("logged out")
    // Sign-out successful.
  }).catch(function(error) {
    console.log(error)
    // An error happened.
  });
})
