import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const TitleCards = ({title , category}) => {

  const cardsRef = useRef();
  const [apiData , setApiData] = useState([]);

  const handleWheel = (event)=>{
    event.preventDefault(); //so whenever we rotate the mouse wheel on this card it will not scroll the page vertically
    cardsRef.current.scrollLeft += event.deltaY; //this will scroll the card in left direction when we rotate the mouse wheel 
  }

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzdkMDk0OTQyZDAwNzBmM2MyYTk0ZDI1MDg1OGYyNCIsIm5iZiI6MTcyNzI1NTA1OS42NjA4MDgsInN1YiI6IjY2ZjNjZTljNzQwMTM4NjQxZTY5ZWQ4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YTQNaqLuvNik3ENMC7mCn1K1n4XKz78WDn7jajtM3Qw'
    }
  };
   
  useEffect(()=>{
    cardsRef.current.addEventListener('wheel', handleWheel);
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));
  } , [category])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card,index)=>{
          return(
            <Link to={`/player/${card.id}`} className='card' key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" /> {/*here we serched the web for image url of tmdb because we werent getting the full url of the image from the api call */}
              <p>{card.original_title}</p>
            </Link>
          )
        })}
      </div>

    </div>
  )
}

export default TitleCards