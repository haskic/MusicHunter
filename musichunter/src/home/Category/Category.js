import React,{useState,useEffect} from 'react';

import defaultCover from './../../AlbumCover.jpeg';
import song2 from './../../shakira.mp3';
import song3 from './../../lose.mp3';
import './../scss/Category.scss';

const testCategory = [{
    title: "Charts: Top 50",
    description: "The most played tracks on SoundCloud this week",
    playlists: [
        {
            title: "All music genres",
            description: "TOP 50",
            playlist: [
                { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 },
                { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 },
                { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 },
                { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 },
                { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 },
                { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 },
                { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 }
            ]
        },
        {
            title: "All music genres",
            description: "TOP 50",
            playlist: [
                { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 },
                { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 },
                { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 },
                { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 },
                { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 },
                { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 },
                { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 }
            ]
        },
        {
            title: "All music genres",
            description: "TOP 50",
            playlist: [
                { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 },
                { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 },
                { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 },
                { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 },
                { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 },
                { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 },
                { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 }
            ]
        }
    ]
}];

function Category(props) {
    const [categoryList, setcategoryList] = useState([])
    function categoryUpdater(categoryArray) {
        categoryArray.forEach(element => {
            let el = <div></div>
        });
    }
    function categoryCaruselParser(){
        
    }
    return (<div className="home-page-category">
        <div className="category">
            <div className="category-container">
                <div className="category-title">Charts: Top 50</div>
                <div className="category-description">The most played tracks on SoundCloud this week</div>
                <div className="category-carusel">
                    <div className="category-carusel-item">
                        <div className="category-carusel-item-album-cover">
                            <img src={defaultCover}></img>
                        </div>
                        <div className="category-carusel-item-title">All music genres</div>
                        <div className="category-carusel-item-description">Top 50</div>
                    </div>
                    <div className="category-carusel-item">
                        <div className="category-carusel-item-album-cover">
                            <img src={defaultCover}></img>
                        </div>
                        <div className="category-carusel-item-title">All music genres</div>
                        <div className="category-carusel-item-description">Top 50</div>
                    </div>
                    <div className="category-carusel-item">
                        <div className="category-carusel-item-album-cover">
                            <img src={defaultCover}></img>
                        </div>
                        <div className="category-carusel-item-title">All music genres</div>
                        <div className="category-carusel-item-description">Top 50</div>
                    </div>
                    <div className="category-carusel-item">
                        <div className="category-carusel-item-album-cover">
                            <img src={defaultCover}></img>
                        </div>
                        <div className="category-carusel-item-title">All music genres</div>
                        <div className="category-carusel-item-description">Top 50</div>
                    </div>
                </div>
            </div>
        </div>
    </div>)

}


export default Category;