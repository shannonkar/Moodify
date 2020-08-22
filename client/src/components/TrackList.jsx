import React from 'react';
import Track from './Track';

const TrackList = ({ searchResults }) => {
	const trackComponent = searchResults.map((track, i) => {
		return <Track id = { searchResults[i].id } name = { searchResults[i].name } artist = { searchResults[i].artist} image = { searchResults[i].image } />
	})
	return(
		<div className = 'flex-container'> 
		{ trackComponent }
		</div>
		);
	}

export default TrackList;

