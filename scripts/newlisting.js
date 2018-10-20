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



let submit = document.querySelector("#subform")
console.log(submit)

submit.addEventListener("click", e => {
  if (loggedIn()) {
    let title = document.querySelector("#title").value
    let desc = document.querySelector("#desc").value
    let lat = document.querySelector("#lat").value
    let long = document.querySelector("#long").value
    let con = document.querySelector("#const").checked
    let coord = document.querySelector("#coord").checked
    let other = document.querySelector("#other").checked

    let info = {
      title: title,
      desc: desc,
      lat: lat,
      long: long,
      con: con,
      coord: coord,
      other: other
    }
    console.log(info)

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {}
    updates['/posts/' + newPostKey] = info
    updates['/user-posts/' + loggedIn() + '/' + newPostKey] = info

    console.log(firebase.database().ref().update(updates))
    var file = document.querySelector("#imgupload").files[0]
    var storageRef = firebase.storage().ref()
    var pathRef = newPostKey
    console.log(file)
    var uploadTask = storageRef.child(pathRef).put(file)
  }

})


// let imgButton = document.querySelector("#uploadimage")
// imgButton.addEventListener("click", e => {
//
//   console.log(file)
// })