import React from 'react';
import './weather.css'

export default function Weather(props) {
    console.log(props.weatherData.dataseries[0].weather)
    const averageTemp = Math.round((props.weatherData.dataseries[0].temp2m.max + props.weatherData.dataseries[0].temp2m.min)/2);
    const weather = props.weatherData.dataseries[0].weather;
    const lowTemp = props.weatherData.dataseries[0].temp2m.min;
    const highTemp = props.weatherData.dataseries[0].temp2m.max;
    const dataseries = props.weatherData.dataseries;
    const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dateIndex = week.indexOf(new Date().toLocaleDateString('en-us', { weekday:"short"}));
    const date = new Date().toLocaleDateString('en-us', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
    
    const weatherList = ['clear', 'pcloudy', 'mcloudy', 'cloudy', 'humid', 'lightrain', 'oshower', 'ishower', 'lightsnow', 'rain', 'snow', 'rainsnow'];
    const weatherIcon = [
        <i class="fa-regular fa-sun"></i>,
        <i class="fa-solid fa-cloud-sun"></i>,
        <i class="fa-solid fa-cloud-sun-rain"></i>,
        <i class="fa-solid fa-cloud"></i>,
        <i class="fa-solid fa-cloud-sun-rain"></i>,
        <i class="fa-solid fa-cloud-showers-heavy"></i>,
        <i class="fa-solid fa-cloud-showers-water"></i>,
        <i class="fa-solid fa-cloud-rain"></i>,
        <i class="fa-solid fa-cloud-meatball"></i>,
        <i class="fa-solid fa-cloud-rain"></i>,
        <i class="fa-solid fa-snowflake"></i>,
        <i class="fa-solid fa-cloud-moon-rain"></i>
    ];
    const windList = ['Calm', 'Light', 'Moderate', 'Fresh', 'Strong', 'Gale', 'Storm', 'Hurricane']


    function createList(){
        return dataseries.map((item, index) => (
            <div key={index} className='list'>
                <p className='day'>{index === 0 ? 'Today' : week[(dateIndex + index)%7]}</p>
                <p className='listWeather'>{weatherIcon[weatherList.indexOf(item.weather)]}</p>
                <p className='wind'><i class="fa-solid fa-wind"></i> {windList[item.wind10m_max - 1]}</p>
                <p className='listTemp'>{item.temp2m.min}&deg;C--{item.temp2m.max}&deg;C</p>
            </div>
        ))
    }
    function refresh(){
        return window.location.reload()
    }
  return (
    <div className='weather'>
        <div className="today">
            <div className="city">
                <div><h2>Auckland </h2></div>
                <h2>&nbsp;  <i className="btn fa-solid fa-rotate" onClick={refresh}></i></h2>
            </div>
            <p className='date'>{date}</p>
            <div className="temp">{averageTemp}&deg;C</div>
            <div className="weatherInfo">{weatherIcon[weatherList.indexOf(weather)]}</div>
            <div className='lowTemp'>L:{lowTemp}&deg;C &nbsp;   H:{highTemp}&deg;C</div>
        </div>
        <div className="sevenday">
            <p className='title'><i className="fa-solid fa-calendar-days"></i> 7-DAY FORECAST</p>
            <div className="table">
                {createList()}
            </div>
        </div>
    </div>
  )
}
