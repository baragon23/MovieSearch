import { useEffect, useState, useCallback } from 'react';
import { API_URL, API_KEY } from '../../config';

export const useMovieFetch = (movieId) => {
	const [state, setState] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const fetchData = useCallback(async () => {
		setError(false);

		try {
			const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
			const result = await (await fetch(endpoint)).json();

			const creditsEndPoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
			const creditsResult = await (await fetch(creditsEndPoint)).json();
			const directors = creditsResult.crew.filter((member) => member.job === 'Director');

			setState({
				...result,
				actors: creditsResult.cast,
				directors: directors,
			});
		} catch (error) {
			setError(true);
			console.log(error);
		} finally {
			setLoading(false);
		}
	}, [movieId]);

	useEffect(() => {
		if (localStorage[movieId]) {
			setState(JSON.parse(localStorage[movieId]));
			setLoading(false);
			console.log('grabbing from local storage');
		} else {
			fetchData();
			console.log('grabbing from API');
		}
	}, [fetchData, movieId]);

	useEffect(() => {
		localStorage.setItem(movieId, JSON.stringify(state));
	}, [movieId, state]);

	return [state, loading, error];
};
