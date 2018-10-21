
function loadCards() {
  let num = 1;
  firebase.database().ref("/posts").on('value', function(snapshot) {
    data = snapshot.val()
    for (key in data) {
      console.log("brandon", data[key])
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

loadCards();
