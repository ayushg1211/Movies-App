import React, { Component } from 'react'
import { movies } from '../movieData'

export class Favourites extends Component {
    constructor() {
        super();

        this.state = {
            genres: [],
            pArr : [],
            currGenre: 'All Genres',
            movies : [],
            currPage : 1,
            searchText : "",
            limit : 7
        }
    }


    componentDidMount(){
        let data = JSON.parse(localStorage.getItem('movies-app') || '[]') ;
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };

        let tempArr = [];
        data.map((movieObj) => {
            if (!tempArr.includes(genreids[movieObj.genre_ids[0]])) {
                tempArr.push(genreids[movieObj.genre_ids[0]])
            }
        })

        tempArr.unshift('All Genres');

        this.setState({
            movies : [...data] ,
            genres : [...tempArr]
        })
    }

    handleGenreChange = (genre) => {
        this.setState({
            currGenre : genre
        })
    }

    sortPopularityDesc = () =>{
        let sortedArr = this.state.movies ;
        sortedArr.sort(function(objA, objB){
            return objB.popularity - objA.popularity ;
        })

        this.setState({
            movies : [...sortedArr]
        })
    }

    sortPopularityAsc = () =>{
        let sortedArr = this.state.movies ;
        sortedArr.sort(function(objA, objB){
            return objA.popularity - objB.popularity ;
        })

        this.setState({
            movies : [...sortedArr]
        })
    }

    sortRatingDesc = () =>{
        let sortedArr = this.state.movies ;
        sortedArr.sort(function(objA, objB){
            return objB.vote_average - objA.vote_average ;
        })

        this.setState({
            movies : [...sortedArr]
        })
    }

    sortRatingAsc = () =>{
        let sortedArr = this.state.movies ;
        sortedArr.sort(function(objA, objB){
            return objA.vote_average - objB.vote_average ;
        })

        this.setState({
            movies : [...sortedArr]
        })
    }


    handleDelete=(id)=>{
        let newarr = [];
        newarr = this.state.movies.filter((movieObj)=>movieObj.id!=id)
        this.setState({
            movies:[...newarr]
        })
        localStorage.setItem("movies-app",JSON.stringify(newarr))
    }

    handlePageChange = (pages)=> {
        this.setState({
            currPage : pages
        })
    }


    render() {

        
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };

       let filterArr = [] ;
       if(this.state.searchText === ""){
            filterArr = this.state.movies 
       }
       else{
        filterArr = this.state.movies.filter((moviesObj) => {
            let title = moviesObj.original_title.toLowerCase() ;
            return title.includes(this.state.searchText.toLowerCase().trim() )
        })
       }
       
       if(this.state.currGenre != "All Genres"){
        filterArr = this.state.movies.filter((moviesObj) => genreids[moviesObj.genre_ids[0]] == this.state.currGenre)
       }

       let pages = Math.ceil(filterArr.length/this.state.limit);
        let pagesarr = [];
        for(let i=1;i<=pages;i++){
            pagesarr.push(i);
        }
        let si = (this.state.currPage-1)*this.state.limit;
        let ei = si+this.state.limit;
        filterArr = filterArr.slice(si,ei);

        return (
            <div className='main'>
                <div className='row'>
                    <div className='col-lg-3 col-sm-12'>
                        <ul className="list-group genre-selector">

                            {
                                this.state.genres.map((genre) => (
                                    this.state.currGenre == genre ?
                                        <li style={{ background: "#3f51b5", color: "whitesmoke", fontWeight: 'bold' }} className="list-group-item">{genre}</li> :
                                        <li style={{ color: "#3f51b5" }} className="list-group-item" onClick={() => this.handleGenreChange(genre)}>{genre}</li>
                                ))
                            }


                        </ul>
                    </div>

                    <div className='col-lg-9 favourites-table col-sm-12'>
                        <div className='row'>
                            <input placeholder='Search' type='text' className="input-group-text col" value={this.state.searchText} onChange={(e) => this.setState({searchText : e.target.value})}></input>
                            <input type="number" className="input-group-text col"></input>
                            
                        </div>

                        <div className='row'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col"><i className="fa-solid fa-sort-up" onClick={this.sortPopularityDesc}></i>Popularity<i className="fa-solid fa-sort-down" onClick={this.sortPopularityAsc}></i></th>
                                        <th scope="col"><i className="fa-solid fa-sort-up" onClick={this.sortRatingDesc}></i>Ratings<i className="fa-solid fa-sort-down" onClick={this.sortRatingAsc}></i></th>
                                        <th scope="col">Delete from List</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filterArr.map((movieEle) => (
                                        <tr>
                                            <td><img
                                                style={{ height: "5rem", width: "6rem" }}
                                                src={`https://image.tmdb.org/t/p/original${movieEle.backdrop_path}`} /></td>
                                            <th scope="row">{movieEle.title}</th>
                                            <td>{genreids[movieEle.genre_ids[0]]}</td>
                                            <td>{movieEle.popularity}</td>
                                            <td>{movieEle.vote_average}</td>
                                            <td><button type="button" className="btn btn-danger" onClick={()=> this.handleDelete(movieEle.id)}>Delete</button></td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                        </div>

                        <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        {
                                            pagesarr.map((pages)=>(
                                                <li class="page-item"><a class="page-link" onClick={()=>this.handlePageChange(pages)}>{pages}</a></li>
                                            ))
                                        }
                                    </ul>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}

export default Favourites