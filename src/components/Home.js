import React, { useState, Fragment } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../config';

import Grid from './elements/Grid';
import HeroImage from './elements/HeroImage';
import LoadMoreBtn from './elements/LoadMoreBtn';
import MovieThumb from './elements/MovieThumb';
import SearchBar from './elements/SearchBar';
import Spinner from './elements/Spinner';

import { useHomeFetch } from './hooks/useHomeFetch';

import NoImage from './images/no_image.jpg';

const Home = () => {
	const [{ state, loading, error }, fetchMovies] = useHomeFetch();
	const [searchTerm, setSearchTerm] = useState('');
	console.log(state);

	if (error) return <div>Something went wrong...</div>;
	if (!state.movies[0]) return <Spinner />;

	return (
		<Fragment>
			<HeroImage
				image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`}
				title={state.heroImage.original_title}
				text={state.heroImage.overview}
			/>
			<SearchBar />
			<Grid header={searchTerm ? 'Search Results' : 'Popular Movies'}>
				{state.movies.map((movie) => (
					<MovieThumb
						key={movie.id}
						clickable
						image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : NoImage}
						movieId={movie.id}
					/>
				))}
			</Grid>
			{loading && <Spinner />}
			<LoadMoreBtn />
		</Fragment>
	);
};

export default Home;
