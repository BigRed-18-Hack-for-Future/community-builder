var auth = false
var uid = loggedIn()


window.setTimeout (function () {
  //console.log("WINDOW ON LOAD")
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

  if (user) {
    //console.log("user is true")
    logbtn.style.display = 'none'
    logout.style.display = 'initial'
    current.style.display = 'initial'
    current.setAttribute('href', `profile.html?id=${user.uid}`)
    current.innerHTML = user.displayName
    auth = true
    uid = user.uid
    console.log(uid)
    var updates = {}
    console.log(user)
    updates['/user-info/' + uid] = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      }
    console.log(firebase.database().ref('/').update(updates))
    console.log("user",user)
    return user.uid;
  } else {
    //console.log("user is false")
    //console.log(logout)
    //console.log(current)
    logout.style.display = 'none'
    current.style.display = 'none'
    logbtn.style.display = 'initial'
    auth = false
    return "";
  }
}

// //if logged in show log out button
// if(loggedIn()){
//   console.log(currentUser)
// } else{
//   console.log("no one")
// }

function getUserID() {
  //console.log("user")
  //console.log(firebase.auth().currentUser)
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

    var newPostKey = firebase.database().ref().child('user-info').push().key;
  }).then(function(){ loggedIn()}).catch(function(error) {
    var errorCode = error.code
    var errorMessage = error.message
    var email = error.email
    var credential = error.credential
  });
})

let logout = document.querySelector("#logout")
logout.addEventListener("click", e => {
  firebase.auth().signOut().then(function() {
    auth = false
    //console.log("logged out")
    // Sign-out successful.
  }).catch(function(error) {
    console.log(error)
    // An error happened.
  });
})
