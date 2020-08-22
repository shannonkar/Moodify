import React from 'react';
import Iframe from 'react-iframe'

const Track = (props) =>{
	return(
		<div className = 'card'>
			<div className = 'card-content'>
			<img src = { props.image } style={{ height: 200 }}
			className ="card-img-top"
			alt="albumn cover"
			/>
		<div className = "card-body text-dark" id = { props.id }>
			<h4 className = "card-title"> Track: { props.name } </h4>
			<p className = "card-text text-secondary">Artist: { props.artist }</p>
			<Iframe url ={`https://open.spotify.com/embed/track/${props.id}`}
					id ="playButton"
					width="300"
					height="100"
					frameborder="0"
					allowtransparency="true" 
					allow="encrypted-media"/>
	</div>
		</div>
		
    </div>
    );
}
export default Track;