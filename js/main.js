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
    })
    .catch((err)=>{
        console.log(err);
    });

    
}

