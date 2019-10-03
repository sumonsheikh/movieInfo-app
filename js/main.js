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

