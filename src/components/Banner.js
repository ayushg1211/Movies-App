import React, { Component } from 'react'
import { movies } from '../movieData';

export class Banner extends Component {
    render() {
        let movieArr = movies.results[Math.floor(Math.random() * 10) + 1] ;
        let backDrop = movieArr.backdrop_path;
        let title =  movieArr.title ;
        let overView = movieArr.overview ;
        
        return (
            <div className="card banner-card">
                
                <img src={`https://image.tmdb.org/t/p/original${backDrop}`} className="card-img-top banner-img" alt="..." />

                    <h5 className="card-title banner-title">{title}</h5>
                    <p className="card-text banner-text">{overView}</p>
                
            </div>
        )
    }
}

export default Banner