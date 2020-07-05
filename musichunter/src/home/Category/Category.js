import React, { useState, useEffect } from 'react';

import defaultCover from './../../AlbumCover.jpeg';
import song2 from './../../shakira.mp3';
import song3 from './../../lose.mp3';
import './../scss/Category.scss';
import Slider from '../../slider/Slider';

import testCategory from './testCategory';
import CategorySubItem from './CategorySubItem';

// const arr = [];
// arr.push(<div className="slide-container">
//     <div className="category-carusel-item" >
//         <div className="category-carusel-item-album-cover">
//             <img src={defaultCover}></img>
//         </div>
//         <div className="category-carusel-item-title">All music genres</div>
//         <div className="category-carusel-item-description">Top 50</div>
//     </div>
//     <div className="category-carusel-item">
//         <div className="category-carusel-item-album-cover">
//             <img src={defaultCover}></img>
//         </div>
//         <div className="category-carusel-item-title">All music genres</div>
//         <div className="category-carusel-item-description">Top 50</div>
//     </div>
//     <div className="category-carusel-item">
//         <div className="category-carusel-item-album-cover">
//             <img src={defaultCover}></img>
//         </div>
//         <div className="category-carusel-item-title">All music genres</div>
//         <div className="category-carusel-item-description">Top 50</div>
//     </div>
//     <div className="category-carusel-item">
//         <div className="category-carusel-item-album-cover">
//             <img src={defaultCover}></img>
//         </div>
//         <div className="category-carusel-item-title">All music genres</div>
//         <div className="category-carusel-item-description">Top 50</div>
//     </div>
// </div>);
// arr.push(<div className="slide-container">
//     <div className="category-carusel-item">
//         <div className="category-carusel-item-album-cover">
//             <img src={defaultCover}></img>
//         </div>
//         <div className="category-carusel-item-title">All music genres</div>
//         <div className="category-carusel-item-description">Top 50</div>
//     </div>
//     <div className="category-carusel-item">
//         <div className="category-carusel-item-album-cover">
//             <img src={defaultCover}></img>
//         </div>
//         <div className="category-carusel-item-title">All music genres</div>
//         <div className="category-carusel-item-description">Top 50</div>
//     </div>
//     <div className="category-carusel-item">
//         <div className="category-carusel-item-album-cover">
//             <img src={defaultCover}></img>
//         </div>
//         <div className="category-carusel-item-title">All music genres</div>
//         <div className="category-carusel-item-description">Top 50</div>
//     </div>
//     <div className="category-carusel-item">
//         <div className="category-carusel-item-album-cover">
//             <img src={defaultCover}></img>
//         </div>
//         <div className="category-carusel-item-title">All music genres</div>
//         <div className="category-carusel-item-description">Top 50</div>
//     </div>
// </div>);

function Category(props) {
    const [categoryList, setcategoryList] = useState(categoryCaruselParser(testCategory, 4));
    function categoryUpdater(categoryArray) {
        // categoryArray.forEach(element => {
        //     let el = <div></div>
        // });
    }
    function splitIntoSubArray(arr, count) {
        let copyarr = arr.slice(0);
        var newArray = [];
        while (copyarr.length > 0) {
            newArray.push(copyarr.splice(0, count));
        }
        return newArray;
    }
    function categoryCaruselParser(categoryArray, elementsInOneSlide) {
        let newCategoryList = [];
        categoryArray.forEach(element => {
            let newSlides = [];
            let slidesSubArray = splitIntoSubArray(element.playlists, elementsInOneSlide);
            console.log("SUB array  =", slidesSubArray);
            slidesSubArray.forEach((slideElement, index) => {
                newSlides.push(<div className="slide-container">
                    {slideElement.map((value) => {
                        // return <div className="category-carusel-item">
                        //     <div className="category-carusel-item-album-cover">
                        //         <img src={defaultCover}></img>
                        //     </div>
                        //     <div className="category-carusel-item-title">{value.title}</div>
                        //     <div className="category-carusel-item-description">{value.description}</div>
                        // </div>
                        return <CategorySubItem title={value.title} description={value.description} albumCover={defaultCover} playlist={value}></CategorySubItem>
                    })}
                    {/* {console.log("el = ", slideElement)} */}
                </div>)
            })
            // element.playlists.forEach(el => {
            //     newSlides.push(
            //         <div className="category-carusel-item">
            //             <div className="category-carusel-item-album-cover">
            //                 <img src={defaultCover}></img>
            //             </div>
            //             <div className="category-carusel-item-title">{el.title}</div>
            //             <div className="category-carusel-item-description">{el.description}</div>
            //         </div>
            //     );
            // })
            // for (let index = 0; index < element.playlists; index++) {
            //     if (index % elementsInOneSlide === 0 && index !== 0) {

            //     }

            // }
            console.log("NEW SLIDES", newSlides);
            newCategoryList.push(<div className="category">
                <div className="category-container">
                    <div className="category-title">{element.title}</div>
                    <div className="category-description">{element.description}</div>
                    <div className="category-carusel">
                        <Slider width="100%" height="300px" slides={newSlides} infinity={false} duration={410}></Slider>
                    </div>
                </div>
            </div>);
        });
        // console.log("NEW SLIDES",newCategoryList);
        // setcategoryList(newCategoryList);
        return newCategoryList;
    }
    return (<div className="home-page-category">
        {/* <div className="category">
            <div className="category-container">
                <div className="category-title">Charts: Top 50</div>
                <div className="category-description">The most played tracks on SoundCloud this week</div>
                <div className="category-carusel">
                    <Slider width="100%" height="300px" slides={arr} infinity={false} duration={410}></Slider>
                </div>
            </div>
        </div>
        <div className="category">
            <div className="category-container">
                <div className="category-title">Charts: Top 50</div>
                <div className="category-description">The most played tracks on SoundCloud this week</div>
                <div className="category-carusel">
                    <Slider width="100%" height="300px" slides={arr} infinity={false} duration={410}></Slider>
                </div>
            </div>
        </div> */}
        {/* {categoryCaruselParser(testCategory,4)} */}
        {categoryList}
    </div>)

}


export default Category;