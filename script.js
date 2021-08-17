  $form = document.getElementById('artist-search'),
    $error = document.querySelector('error'),
    $main = document.querySelector('main'),
    $artist = document.getElementById('artist'),

    $form.addEventListener('submit',async e=>{
    e.preventDefault();

    try{
    
    let artist = e.target.artist.value.toLowerCase(),
        $artistTemplate = "",
        artistAPI = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artist}`,   
        artistFetch = fetch(artistAPI),
        [artistRes] = await Promise.all([artistFetch]),
        artistData = await artistRes.json();



        // Validacion cuando la API responde la informacion del artista
        
        if(artistData.artists === null){
            $artistTemplate =`<h2>No existe el artista <mark>${artist}</mark></h2>`
        }else{
            let artist=artistData.artists[0];
            $artistTemplate=`
                <img src="${artist.strArtistBanner}" alt="${artist.strArtist}">
                <h2>${artist.strArtist}</h2>
                <img src="${artist.strArtistThumb}" alt="${artist.strArtist}">
                <p>${artist.intBornYear} - ${(artist.intDiedYear || "Presente")}</p>
                <p>${artist.strCountry}</p>
                <p>${artist.strGenre} - ${artist.strStyle}</p>
                <p>${artist.strBiographyES}</p>
                <img src="${artist.strArtistFanart}" alt="${artist.strArtist}">
            `;
        }

        

        $artist.innerHTML = $artistTemplate;

        
    
    } catch (err){
        console.log(err);
        let message = err.statusText || "Ocurrió un error";
        $error.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
    }


});
