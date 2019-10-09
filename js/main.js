$(document).ready(()=>{
    $('#searchForm').on('submit',(e)=>{
      
        let searchText=$('#searchText').val();
        console.log(searchText);
        getMovies(searchText);
        e.preventDefault();
        
    });
});

function getMovies(searchText){
    axios.get('http://www.omdbapi.com/?apikey=6e66f068&s='+searchText)
    .then((res)=>{
        console.log(res);
        let movies=res.data.Search;
        let output='';
        $.each(movies,(index,movie)=>{
            output +=`
            
            <div class="col-md-3">
                <div class="well text-center">
                    <img src="${movie.Poster}"/>
                    <h5>${movie.Title}</h5>
                    <a  onClick="movieSelected('${movie.imdbID}')" href="movie.html" class="btn btn-primary">Movie Details</a>
                    
                </div>
            </div>
        
            `;
            
           
        });
        $('#movies').html(output);
    })
    .catch((err)=>{
        console.log(err);
    });

    
}

function movieSelected(id){
       
    sessionStorage.setItem('movieId',id);
    console.log("this movie selected id",movieId);
    window.location='movie.html';
    return false;
}

function getMovie(){
    let movieId=sessionStorage.getItem('movieId');
    axios.get('http://www.omdbapi.com/?apikey=6e66f068&i='+movieId)
    .then((res)=>{
        console.log(res);
        let movie=res.data;
        console.log('movie', movie.Title);
        let output=`
            <div class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster} class="thumbnail">
                </div>
                <div class="col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
                        <li class="list-group-item"><strong>Released: </strong>${movie.Released}</li>
                        <li class="list-group-item"><strong>Rated: </strong>${movie.Rated}</li>
                        <li class="list-group-item"><strong>IMDB Rating: </strong>${movie.imdbRating}</li>
                        <li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
                        <li class="list-group-item"><strong>Writer: </strong>${movie.Writer}</li>
                        <li class="list-group-item"><strong>Actors: </strong>${movie.Actors}</li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="well">
                    <h3>Plot</h3>
                    ${movie.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                    <a href="index.html" class="btn btn-default">Go Back to Search</a>
                </div>
            </div>
        `;
        $('#movie').html(output);
        
    })
    .catch((err)=>{
        console.log(err);
    });
}