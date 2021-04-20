import './App.css';
import React, { useState } from "react";
require('dotenv').config()
console.log(process.env.REACT_APP_API_KEY)
let i, j, k = 0
let locate = React.createRef();
let geolocation = ""
let temperature = ""
let condition = ""
let location = ""
function App() {
  const [output1, setOutput1] = useState('')
  const [output2, setOutput2] = useState('')
  const [output3, setOutput3] = useState('') 
  function showGeo(){
    if (i === 0){
      setOutput1(geolocation);
      console.log(geolocation)
      i = 1
    }
    else{
      setOutput1('')
      console.log(geolocation)
      i = 0
    }
  }
  function showTemp(){
    if (j === 0){
      setOutput2(temperature);
      j = 1
    }
    else{
      setOutput2('')
      j = 0
    }
  }
  function showCond(){
    if (k === 0){
      setOutput3(condition);
      k = 1
    }
    else{
      setOutput3('')
      k = 0
    }
  }
  
  async function senData(){
    try{
      let location = locate.current.value
      const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid="+process.env.REACT_APP_API_KEY+"&units=metric")
      const data = await response.json()
      console.log(data)
      geolocation = "Longitude: "+data["coord"]["lon"]+"\nLatitude: "+data["coord"]["lat"]+"\nCountry: "+data["sys"]["country"]+"\nPlace: "+data["name"]
      setOutput1(geolocation)
      temperature = "Temperature: "+data["main"]["temp"]+"\nFeels like: "+data["main"]["feels_like"]+"\nMinimum Temperature: "+data["main"]["temp_min"]+"\nMaximum Temperature: "+data["main"]["temp_max"]
      setOutput2(temperature)
      condition = "Weather Condition: "+data["weather"][0]["main"]+"\nPressure: "+data["main"]["pressure"]+"\nHumidity: "+data["main"]["humidity"]+"\nVisibility: "+data["visibility"]+"\nwind speed: "+data["wind"]["speed"]+"\nwind direction: "+data["wind"]["deg"]+" deg\nclouds: "+data["clouds"]["all"]+"%"
      setOutput3(condition)
    }
    catch{
      console.log(location)
    }
  }
  return (
    <div className="App">
      <section id = "Header">
        <h1>WeatherApp</h1>
      </section>
      <section id = "search">
        <input type="text" id="place" ref = {locate} placeholder="Location..."  ></input>
      <button type="submit" id ="vButton" onClick={senData}>
        <img src="https://icons.getbootstrap.com/assets/icons/search.svg" alt=""></img></button>
      </section>
      <section id="error">
        
      </section>
      <section id = "card">
        <div id ="geo" onClick={showGeo} ><b>Geolocation</b>
          <button id="geobutton">
            <img src="https://icons.getbootstrap.com/assets/icons/triangle.svg" style={{rotate: '180deg'}} alt=""></img>
          </button>
        </div>
        <section id="Geolocation">{(output1)}</section>
        <br></br>
        <div id ="geo" onClick={showTemp}><b>Temperature</b>
          <button id="expander">
            <img src="https://icons.getbootstrap.com/assets/icons/triangle.svg" style={{rotate: '180deg'}} alt=""></img>
          </button>
        </div>
        <section id="Temperature">{(output2)}</section>
        <br></br>
        <div id ="geo" onClick={showCond}><b>Weather Condition</b>
          <button id="expander">
            <img src="https://icons.getbootstrap.com/assets/icons/triangle.svg" style={{rotate: '180deg'}} alt=""></img>
          </button>
          
        </div>
        <section id="Condition">
          {(output3)}
        </section>
        </section>      
    </div>
  );
}

export default App;
