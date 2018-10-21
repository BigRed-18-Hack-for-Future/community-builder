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

function getId(){
  let url = window.location.href
  console.log(url)
  var id = getParameterByName('id', url)
  console.log(id)
  return id
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

let info = firebase.database().ref(`/posts/${getId()}`).on('value', function(snapshot) {
  data = snapshot.val()
  console.log(data)
  return data
})

function displayPage(id){
  firebase.database().ref(`/posts/${id}`).on('value', function(snapshot) {
    data = snapshot.val()
    console.log(data)
    document.querySelector("#title").innerHTML = data.title
    document.querySelector("#desc").innerHTML = data.desc
    document.querySelector("#creator").setAttribute('href', `profile.html?id=${data.creator}`)
    console.log('user info' + data.creator + ' user id ' + loggedIn())
    if(data.creator == loggedIn()){
      showForm(data)
    }
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

function showForm(data){
  document.querySelector('#updateform').setAttribute("style", "")
  document.querySelector('#editdesc').innerHTML = data.desc
  document.querySelector('#edittitle').setAttribute("value", data.title)
  document.querySelector('#done').value = data.done
  return data
}

let submit = document.querySelector("#update")
console.log(submit)

submit.addEventListener("click", e => {
  if (loggedIn()) {
    let title = document.querySelector("#edittitle").value
    let desc = document.querySelector("#editdesc").value
    let done = document.querySelector("#done").checked

    var updates = {}
    updates['/posts/' + getId() + '/title'] = title
    updates['/user-posts/' + loggedIn() + '/' + getId() + '/title'] = title
    updates['/posts/' + getId() + '/desc'] = desc
    updates['/user-posts/' + loggedIn() + '/' + getId() + '/desc'] = desc
    updates['/posts/' + getId() + '/done'] = done
    updates['/user-posts/' + loggedIn() + '/' + getId() + '/done'] = done

    firebase.database().ref().update(updates)
    // console.log(info, 'info')
    //
    // // Get a key for a new Post.
    // var postKey = getId()
    //
    // // Write the new post's data simultaneously in the posts list and the user's post list.
    // var updates = {}
    // updates['/posts/' + postKey] = info
    // updates['/user-posts/' + loggedIn() + '/' + postKey] = info
    //
    // console.log(firebase.database().ref().update(updates))
    // console.log(info)
    // //window.location.href = `project.html?id=${newPostKey}`
  }

})
