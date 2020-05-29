import React, { Fragment } from 'react';

import Actor from './elements/Actor';
import Grid from './elements/Grid';
import MovieInfo from './elements/MovieInfo';
import MovieInfoBar from './elements/MovieInfoBar';
import Navigation from './elements/Navigation';
import Spinner from './elements/Spinner';

import { useMovieFetch } from './hooks/useMovieFetch';

const Movie = ({ movieId }) => {
	const [movie, loading, error] = useMovieFetch(movieId);
	console.log(movie);

	if (error) return 'Someting went wrong...';
	if (loading) return <Spinner />;

	return (
		<Fragment>
			<Navigation movie={movie.original_title} />
			<MovieInfo movie={movie} />
			<MovieInfoBar />
			<Grid>
				<Actor />
			</Grid>
		</Fragment>
	);
};

export default Movie;
