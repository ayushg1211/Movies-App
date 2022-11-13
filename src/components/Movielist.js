import React, { Component } from "react";
// import { movies } from "../movieData";
import axios from 'axios' ;

export class Movielist extends Component {

  constructor() {
    super();
    console.log("constructor") ;
    this.state = {
      hover: '',
      pArr : [1],
      movies : [],
      currPage : 1 ,
      favourites : []
    }
  }

  async componentDidMount(){
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=29f5f6886429bc68f1a97aa4c4cc5598&language=en-US&page=${this.state.currPage}`)
        let movieData = res.data ;
        console.log(movieData) ;
        console.log('mounting with CDM third')

        this.setState({
          movies : [...movieData.results]
        })
        
  }

  changeMovies = async() =>{
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=29f5f6886429bc68f1a97aa4c4cc5598&language=en-US&page=${this.state.currPage}`)
        let movieData = res.data ;
        console.log(movieData) ;
        console.log('mounting with CDM third')

        this.setState({
          movies : [...movieData.results]
        })
  }

  handleNext = () =>{
    let tempArr = [] 
    for(let i=1 ; i<=this.state.pArr.length+1 ; i++){
      tempArr.push(i) ;
    }

    this.setState({
      pArr : [...tempArr],
      currPage:this.state.currPage+1 
    }, this.changeMovies)

  }
  handlePrevious = () =>{
    if(this.state.currPage != 1){
      this.setState({
        currPage:this.state.currPage-1 
      }, this.changeMovies)
    }
    }

    handlePageClick = (value) =>{
      if(value != this.state.currPage){
        this.setState({
          currPage:value 
        }, this.changeMovies)
      }
    }

    handleFavourites = (movieObj) => {
      let oldData =  JSON.parse(localStorage.getItem('movies-app') || "[]") ;

      if(this.state.favourites.includes(movieObj.id)){
        oldData = oldData.filter((m) => m.id != movieObj.id) ;
      }
      else{
        oldData.push(movieObj)
      }
      
      console.log(oldData) ;
      localStorage.setItem("movies-app", JSON.stringify(oldData)) ;

      this.handleFavouritesState() ;
    }

    handleFavouritesState = (movieObj) => {
      let oldData =  JSON.parse(localStorage.getItem('movies-app') || "[]") ;
      let temp = oldData.map((movie) => movie.id) ;

      this.setState({
        favourites : [...temp]
      })
    }

  render() {
    console.log('render')
    // let moviesArr = movies.results;

    return (
      <>
        <div>
          <h3 className="text-center">
            <strong>Trending</strong>
          </h3>
        </div>

        <div className="movie-list">
          {this.state.movies.map((movieEle) => (
            <div className="card movie-card" onMouseEnter={() => this.setState({ hover: movieEle.id })} onMouseLeave={() => this.setState({hover : ''})}>
              <img
                src={`https://image.tmdb.org/t/p/original${movieEle.backdrop_path}`}
                // style={{ height: "40vh", width: "20vw" }}
                className="card-img-top movie-img"
                alt="..."
              />

              <h5 className="card-title movie-title">{movieEle.title}</h5>

              <div
                className="button-wrapper"
                style={{ display: "flex", justifyContent: "center" }}
              >

                {
                  this.state.hover == movieEle.id &&
                  <a
                  
                  className="btn btn-primary movie-button text-center" 
                  onClick={() => this.handleFavourites(movieEle)}
                >
                  {this.state.favourites.includes(movieEle.id) ? "Remove from Favourites" : "Add to Favourites"}
                </a>
                }
                


              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: 'center' }}>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item"><a className="page-link" onClick={this.handlePrevious}>Previous</a></li>
              {
                this.state.pArr.map((value) => (
                  <li className="page-item"><a className="page-link" onClick={() => this.handlePageClick(value)}>{value}</a></li>
                ))
              }
              
              <li className="page-item"><a className="page-link" onClick={this.handleNext}>Next</a></li>
            </ul>
          </nav>
        </div>
      </>
    );
  }
}

export default Movielist;
