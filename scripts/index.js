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
  }).then(function(e) {})
  console.log(dispInfo, "this is the info")
  console.log("this prints")
  for(keys in dispInfo){
    console.log(key)
    console.log("hello")
  }
  console.log("this also")
  return dispInfo
}

function mapDataFromId(projID) {
  let dispInfo  = {}
  firebase.database().ref('/posts'+projID).on('value', function(snapshot){
    data = snapshot.val()
    let short = data[key].desc
    if(short.length > 60){
      short = short.slice(0, 57)
      short += "..."
    }
    dispInfo[projID] = {
      lat: data.lat,
      lng: data.long,
      title: data.title,
      desc: short,
      url: `project.html?id=${projID}`
    }
  })
  return dispInfo
}