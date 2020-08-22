import React, { Component } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import queryString from 'query-string';
import TrackList from './components/TrackList';


let selected_genre;
let accessToken;


class App extends Component{
  constructor(props){
    super(props);
    this.state ={
      //should I be using state? 
      mood: '',
      resolution:'',
      genre: '',
      danceability: '',
      "searchResults": [],
      "topArtistsIDs": []
      
    }
    }
  
  onMoodSelect = (event) => {
    this.setState({mood: event.target.value});
  };

  onResolutionSelect = (event) =>{
    const resolution = event.target.value;
    let valence;
    let danceability;
    let tempo;
      if(resolution === 'Even sadder'){
        valence = 0.1;
        danceability = 0.1;
      }
      else if(resolution ==='Like Dancing'){
        valence = 0.9;
        danceability = 0.9;
      }
      else if(resolution === 'Mellow'){
        tempo = 60;
      }
      this.setState({resolution, valence, danceability, tempo});
};
  

getAccessToken(){
  let parsed = queryString.parse(window.location.hash);
   accessToken = parsed.access_token;
  
  return accessToken;
}

getTopArtists= async() =>{ 
      var url = "https://api.spotify.com/v1/me/top/artists?limit=50";
      var access_token = this.getAccessToken();
        const response = await fetch(url,{
         method: 'GET',
         headers: new Headers({
           'Authorization': 'Bearer ' + access_token
      })
      });
        if(!response.ok){
          throw new Error("Request failed");
        }
        const jsonResponse = await response.json();
        if(jsonResponse.total ===0){
          return [];
        }
      
        return jsonResponse.items.map(({id, name}) =>({
          id,
        name,

        }));
    
      }
     


   search = async() =>{
    const access_token = this.getAccessToken();
    const {valence, danceability} = this.state; //genre
    try{
      const artists = await this.getTopArtists();
      const artistIds = artists
        .map(artist => artist.id)
        .slice(0,5)
        .join(",");

    let url = `https://api.spotify.com/v1/recommendations?seed_artists=${artistIds}&min_popularity=50&market=US&limit=8`;
    if(valence){
      url += `&target_valence=${valence}`;
    }
    if(danceability){
      url += `&target_danceability=${danceability}`;
    }
    if(selected_genre){
      url += `&seed_genre = ${selected_genre}`
    }
    const response = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: 'Bearer '+ access_token
      })
    });
    if(!response.ok){
      throw new Error("Requested failed");
    }
    const jsonResponse = await response.json();
    if(!jsonResponse.tracks){
      return [];
    }
    return jsonResponse.tracks.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
      image:track.album.images[0].url
    }));
    }catch(e){
      console.log('error');   
    }
    };//end on search

 
onButtonSubmit = async() =>{
  const results = await this.search();
  this.setState({searchResults: results});
    };

  render(){
    return(
      <div className ="App">
          <h1> Moodify </h1>
          <InputForm 
          onMoodSelect = {this.onMoodSelect}
          onResolutionSelect = {this.onResolutionSelect}
          onButtonSubmit ={this.onButtonSubmit} />
          {this.state.searchResults && (
            <TrackList searchResults = { this.state.searchResults }/>
          )}
      </div>
      );
  }
};
export default App;

