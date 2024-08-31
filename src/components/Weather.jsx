
import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import searchIcon from '../assets/search.png';
import sunIcon from '../assets/sun.png';
import cloudIcon from '../assets/cloud.png';
import snowIcon from '../assets/snow.png';
import rainIcon from '../assets/rain.png';
import humidityIcon from '../assets/humidity.png';
import windIcon from '../assets/wind.png';
import drizzleIcon from '../assets/drizzle.png';
function Weather() {
  
  const inputRef =useRef()
  const [weatherdata , setWeatherData]= useState(false);
  
const allIcons ={
   "01d":sunIcon,
   "01n":sunIcon,
   "02d":cloudIcon,
   "02n":cloudIcon,
   "03d":cloudIcon,
   "03n":cloudIcon,
   "04d":drizzleIcon,
   "04n":drizzleIcon,
   "09d":rainIcon,
   "09n":rainIcon,
   "10d":rainIcon,
   "10n":rainIcon,
   "13d":snowIcon,
   "13n":snowIcon,
}

const search= async(city)  =>{
  if(city===""){
    alert("Enter City Name");
    return;
  }
  try{
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

   const response = await fetch(url);
   const data = await response.json();



   if(!response.ok){
    alert(data.message);
    return;
   }
   console.log(data);
   const icon =allIcons[data.weather[0].icon] || sunIcon;
   setWeatherData({
    humidity : data.main.humidity,
    windSpeed : data.wind.speed,
    temperature : Math.floor(data.main.temp),
    location : data.name,
    icon:icon
   })
  }
  catch(error){
  setWeatherData(false);
  console.error("Error in fetching data");
  }

}

useEffect( ()=>{
        
    search("Pakistan");
},[])
  return (
    <>
    <div className='weather'>
        <div className="search-bar">
           <input ref={inputRef} type='text' placeholder='Search'/>
           <img src={searchIcon} onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherdata?<>
          <img src={weatherdata.icon} className='sun-icon'/>
        <p className='temperature'>{weatherdata.temperature}°C</p>
        <p className='location'>{weatherdata.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidityIcon}/>
            <div>
              <p>{weatherdata.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={windIcon}/>
            <div>
              <p>{weatherdata.windSpeed}Km/h</p>
              <span>Wind Speed</span>
            </div>

          </div>
        </div>
        </>  : <></>}
    </div>
    </>
  )
}

export default Weather
