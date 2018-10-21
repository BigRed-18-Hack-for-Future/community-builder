// var help = document.querySelector("#check")
// help.addEventListener('click', e => {
//   loggedIn()
//   console.log(firebase.auth().currentUser)
// })
let submit = document.querySelector("#subform")
console.log(submit)

submit.addEventListener("click", e => {
  if (uid) {
    let title = document.querySelector("#title").value
    let desc = document.querySelector("#desc").value
<<<<<<< HEAD
    //let lat = document.querySelector("#lat").value
    //let long = document.querySelector("#long").value
=======
    // let lat = document.querySelector("#lat").value
    // let long = document.querySelector("#long").value
>>>>>>> b4c6da14fab50ab372c7dcd589422eeb7f9bfcec
    let con = document.querySelector("#const").checked
    let coord = document.querySelector("#coord").checked
    let other = document.querySelector("#other").checked

    let info = {
      title: title,
      desc: desc,
      lat: 10,
      long: 10,
      con: con,
      coord: coord,
      other: other,
      done: false,
      creator: uid
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
<<<<<<< HEAD
    var uploadTask = storageRef.child(pathRef).put(file).then(() => {
      window.location.href = `project.html?id=${newPostKey}` })
    console.log("successfully sent image file")
    //window.location.href = `project.html?id=${newPostKey}`
=======
    console.log(file)
    console.log("image upload")
    var uploadTask = storageRef.child(pathRef).put(file)
    window.location.href = `project.html?id=${newPostKey}`
>>>>>>> b4c6da14fab50ab372c7dcd589422eeb7f9bfcec
  }

})


// let imgButton = document.querySelector("#uploadimage")
// imgButton.addEventListener("click", e => {
//
//   console.log(file)
// })
