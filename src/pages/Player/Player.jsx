import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = React.useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
  })

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

  React.useEffect(() => {
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //An account is required!
    //https://www.themoviedb.org/
    //Username: jecir
    //Password: 151844?B
    //jecir84707@minduls.com
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => /*console.log(res)*/setApiData(res.results[0]))
      .catch(err => console.error(err));
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  }, [])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => { navigate(-2) }} />
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className='player-info'>
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
