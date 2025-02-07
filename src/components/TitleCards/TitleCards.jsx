import * as React from 'react'
import { Link } from 'react-router-dom'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'

const TitleCards = ({ title, category }) => {
  const cardsRef = React.useRef();
  const [apiData, setApiData] = React.useState([]);

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //An account is required!
  //https://www.themoviedb.org/
  //Username: jecir
  //Password: 151844?B
  //jecir84707@minduls.com
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzQxZTI1ZDRmYzc2MTNmZWI5MmQ3NTVhODk0M2U2NSIsIm5iZiI6MTczODkwNzkxNy4wMDMsInN1YiI6IjY3YTVhMTBjZGYzMzZmMzhhYjg1ZGMwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xc1M5lo3I1pR4yd3Fpq80e3o4C3yykGLBQ7iBUYewhc'
    }
  };
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  React.useEffect(() => {
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //An account is required!
    //https://www.themoviedb.org/
    //Username: jecir
    //Password: 151844?B
    //jecir84707@minduls.com
    /*fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)*/
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results)/*console.log(res)*/)
      .catch(err => console.error(err));
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    if (cardsRef.current)
      cardsRef.current.addEventListener('wheel', handleWheel);
  }, [])

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {
          //cards_data.map((card, index) => {
          apiData.map((card, index) => {
            //return <div className='card' key={index}>
            //<img src={/*card.image*/`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt='' />
            //<p>{/*card.name*/card.original_title}</p>
            //</div>
            return <Link to={`/player/${card.id}`} className='card' key={index}>
              <img src={/*card.image*/`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt='' />
              <p>{/*card.name*/card.original_title}</p>
            </Link>
          })
        }
      </div>
    </div>
  )
}

export default TitleCards
