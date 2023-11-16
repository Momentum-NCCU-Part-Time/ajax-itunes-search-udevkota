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
          

          function dataToHTML (song){
            return `<div class="songDiv" class="songDivs">
                  <img src="${song.artworkUrl100}" alt="Song Picture"/>
                  <h2 class="songTitleData">${song.trackName}</h2>
                  <h3 class="artistNameData">${song.artistName}</h3>
                  <h4 class="artistAlbumData">${song.collectionName}</h4>
                  <button class="playBtn" data-id="${song.trackId}" data-audio="${song.previewUrl}" data-artist="${song.artistName}" data-song="${song.trackName}"type="button">Play Now</button>
                </div>`
          }
          
          let allSongs = data.results.map((song) => dataToHTML(song)).join('\n')

          entryPoint.innerHTML = allSongs

          // this.addAudioSource()
      } 
    })
      
  },
  // addAudioSource: function () {
  //   let buttonsPlay = document.querySelectorAll(".playBtn")
  //   for (let button of buttonsPlay) {
  //     button.addEventListener('click', (event) => {
  //       event.preventDefault()
  //       let audioSrc = event.target.dataset.audio
  //       console.log(audioSrc)
  //       //uncaught in promise type errorthis.addAudioSource is not a function 
     
  //       //if my code did work lol 
  //       //document.querySelector('figure').classList.remove('hidden')
  //       // document.querySelector('audio').src = audioSrc
  //       // let artName = event.target.dataset.artist
  //       // let musicName = event.target.dataset.trackName
  //       // document.querySelector('figcaption').innerText = `Now Playing: ${artName} - ${musicName}`

  //     })
  //   }
  // },
  addEventListener: function () {
    const form = document.getElementById('artistSearch')
    form.addEventListener('submit', this.getSongs) 
    // Listen to form submission and call getSongs()
  }

}

  itunesApp.addEventListener()

//Add the event listeners to the button
//using the unique data-id on each playBtn, send the audio src (song.previewUrl) to the addAudioSrc()
//function addAudioSrc()


  //WIP 
  //audio
  //css 
  //refactor into OOP so that each function only perfoms one action

 
//code that may or may not work but not using this atm
// function addBtnEventListener(){
//   let buttonsPlay = document.querySelectorAll(".playBtn")
//   for(let button of buttonsPlay){
//     button.addEventListener( 'click', (event) =>{
//       event.preventDefault()
//       addAudioSource(button.dataset.id)
//     })
//   }
// }