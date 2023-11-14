const itunesApp = {
  dataLibrary: [],
  
  //methods
  getSongs: function (event) {
    event.preventDefault() 
    let artistUrlSpace = document.querySelector("#artistName").value.replaceAll(" ", "+")
    let fullUrl = `https://proxy-itunes-api.glitch.me/search?term=${artistUrlSpace}&entity=song&attribute=artistTerm`
  
    fetch(fullUrl)
      .then(response => {
        if(!response.ok){
          alert(`Error ${response.status}. Response unsuccessful. Please try again.`)
          location.reload()
          // throw new Error(response.status)
        }
        return response.json()
      })
      .then(data => {
        console.log(data)
        if(data.resultCount === 0){
          alert('No results found for this artist/band. Try again.')
          location.reload()
        }else{
          const entryPoint = document.getElementById('container')
          let song1 = data.results[0]
          console.log(song1)
          let song1Data = `<div id="songDiv" class="songDivs">
                  <img src="${song1.artworkUrl100}" alt="Song Picture"/>
                  <h3 id="songTitleData">${song1.trackName}</h3>
                  <h4 id="artistAlbumData">${song1.collectionName}</h4>
                  <h2 id="artistNameData">${song1.artistName}</h2>
                  <audio src="${song1.previewUrl}" controls autoplay></audio>
                </div>`
        
          // let allCustomers = customers.map((customer) => customerToHTML(customer)).join('\n');

          entryPoint.innerHTML = song1Data
        
        // console.log(data.results.map( (song, index) =>{
        //   return `<div id="${index}">
        //             <img src="${song.}"
        //           </div>`
        // }))
        }
      })
      
  },
  addEventListener: function () {
    const form = document.getElementById('artistSearch')
    form.addEventListener('submit', this.getSongs) 
    // Listen to form submission and call getSongs()
  }

}

  itunesApp.addEventListener()

  //WIP 
  //display all songs
  //audio
  //css 
  //refactor into OOP so that each function only perfoms one action

 
  