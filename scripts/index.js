// let info = document.querySelector("#infoHolder")
//
// let holder = document.querySelector("#holder")
// console.log(holder)
// firebase.database().ref("/posts").on('value', function(snapshot) {
//   console.log(snapshot.val())
//   data = snapshot.val()
//   for (key in data) {
//     holder.innerHTML += `${data[key].title}`
//     console.log(key)
//
//     //-LPHEglNt6a3bI0NAyNw
//     firebase.storage().ref(key).getDownloadURL().then(function(url) {
//       // Or inserted into an <img> element:
//       // var img = document.getElementById('myimg');
//       // img.src = url;
//       holder.innerHTML += `<img src="${url}"/>`
//     }).catch(function(error) {
//       // Handle any errors
//       holder.innerHTML += `<img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg"/>`
//     })
//
//   }
// })
