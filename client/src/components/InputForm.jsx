import React from 'react';

const InputForm = ({onMoodSelect, onResolutionSelect, onGenreSelect, onButtonSubmit}) => {
	return(
	<div className ="form">
     <p className = 'f3'>
     	{'Moodify will generate playlists for you based on your mood and what you want to end up feeling'}
     </p>
     	<div className = 'center'>
     		<div className ='form-content'>
     			<select id="types" className="selector" name="Mood"
     				onChange = {onMoodSelect}>
 					 <option value=""> Select the Mood</option>
 						<option label="Sad" value="Sad">Sad
  						</option>
						 <option label="Low Energy" value="Low Energy">Low Energy
						 </option>
						 <option label="Happy" value="Happy">Happy
						 </option>
  
					</select>
     			
     			<select id="types" className="selector" name="Resolution"
     				onChange = {onResolutionSelect}
     			>
 					 <option value="Resolution"> I want to feel...</option>
 						<option label="Even sadder" value="Even sadder">Even Sadder
  						</option>
						 <option label="Like Dancing" value="Like Dancing">Like Dancing
						 </option>
						 <option label="Mellow" value="Mellow">Mellow
						 </option>
  
					</select>
                   
     			<button 
          			className = 'button'
          			onClick = {onButtonSubmit}>
                        Submit
     			</button>
     		</div>
		</div>
    </div>
		);
}
export default InputForm;