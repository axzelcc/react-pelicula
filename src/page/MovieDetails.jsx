import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../data/httpClient";
import { getMovieImg } from "../util/getMovieImg";
import "../page/MovieDetails.css"

export function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    get("/movie/" + movieId).then((data) => {
      setMovie(data);
      var generosarray = "";
      data.genres.forEach((item) => {
        generosarray = generosarray + item.name + " ";
      });
      setGeneros(generosarray);
    });
  }, [movieId]);

  const imageUrl = getMovieImg(movie.poster_path, 500);

  return (
    <div className="detailsContainer">
      <img src={imageUrl} className='col movieImage'/>
      <div className="col movieDetails">
        <p className="title">
          <strong>Titulo: </strong>
          {movie.title}
        </p>
        <p>
          <strong>Genero: </strong>
          {generos}
        </p>
        <p>
          <strong>Descripcion: </strong>
          {movie.overview}
        </p>
      </div>
    </div>
  );
}
