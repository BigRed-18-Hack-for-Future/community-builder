function getMapData(){
  let dispInfo = {}
  firebase.database().ref('/posts').on('value', function(snapshot){
    data = snapshot.val()
    for(key in data){
      let short = data[key].desc
      if(short.length > 60){
        short = short.slice(0, 57)
        short += "..."
      }
      dispInfo[key] = {
        lat: data[key].lat,
        lng: data[key].long,
        title: data[key].title,
        desc: short,
        url: `project.html?id=${key}`
      }
    }
  })
  return dispInfo
}
