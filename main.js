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
        if(data.resultCount === 0){
          alert('No results found for this artist/band. Try again.')
          location.reload()
        }else{
          const entryPoint = document.getElementById('container')
          console.log(data)
          console.log(data.results)

          function addBtnEventListener(){
            let buttonsPlay = document.querySelectorAll(".playBtn")
            for(let button of buttonsPlay){
              button.addEventListener( 'click', (event) =>{
                event.preventDefault()
                addAudioSource(button.dataset.id)
                //add addAudioSource() func
              })
            }
          }
          

          function dataToHTML (song){
//dataset.id 
            addBtnEventListener()
            return `<div id="songDiv" class="songDivs">
                  <img src="${song.artworkUrl100}" alt="Song Picture"/>
                  <h3 id="songTitleData">${song.trackName}</h3>
                  <h4 id="artistAlbumData">${song.collectionName}</h4>
                  <h2 id="artistNameData">${song.artistName}</h2>
                  <button class="playBtn" data-id=${song.trackId} type="button">Play Now</button>
                  <audio src="${song.previewUrl}" controls></audio>
                </div>`
          }
          let allSongs = data.results.map((song) => dataToHTML(song)).join('\n');

          entryPoint.innerHTML = allSongs
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

 
