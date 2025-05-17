import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PopularMovies.css";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function PopularMovies({ title }) {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPopularMovies = async () => {
			try {
				const response = await fetch(
					`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
				);
				const data = await response.json();

				const trimmed = data.results.map((movie) => ({
					id: movie.id,
					title: movie.title,
					image: `${TMDB_IMAGE_BASE}${movie.poster_path}`,
				}));
				setMovies(trimmed);
			} catch (error) {
				console.error("Failed to fetch movies:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPopularMovies();
	}, []);

	return (
		<div className="carousel">
			<h1 className="carousel-title">{title}</h1>
			<div className="full-width-section">
				<div className="movie-carousel">
					{loading ? (
						<p>Loading...</p>
					) : (
						movies.map((movie) => (
							<Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
								<img src={movie.image} alt={movie.title} />
								<p>{movie.title}</p>
							</Link>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export default PopularMovies;