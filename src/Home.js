import React, { useEffect, useState } from 'react'
import './style.scss';
import logo from './images/github_logo.png';
import icons from './images/icons.png';
import Weathercard from './Weathercard';
function Home() {
  const [country, setcountry] = useState("");
  const [data, setdata] = useState("");
  const [forecast, setforecast] = useState("");
  useEffect(() => {
    const fetchdata = async () => {
      const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=324a6851c6b94a99bf70af2a07641b1e&units=metric`);
      const result = await data.json();
      // console.log(result);
      setdata(result);
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${country}&appid=324a6851c6b94a99bf70af2a07641b1e&units=metric`
      );
      const forecastData = await forecastRes.json();
      if (!forecastData.list) {
        console.log("API Error:", forecastData);
        return;
      }
      const daily = forecastData.list.filter(item =>
        item.dt_txt.includes("12:00:00")
      );
      setforecast(daily);
    }
    fetchdata();
  }, [country])
  const today = new Date();
  const formatted = today.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <div className='main-container'>
      <div className='container'>
        <h2>The weather Forecasting</h2>
        <span>09-04-2026 GMT</span>
        <img src={logo} alt='logo' className='img-fluid'></img>
      </div>
      <div className='wheather'>
        <input type="text"
          value={country}
          onChange={(e) => setcountry(e.target.value)}></input>
        <button>Search</button>
        {data && data.main && (
          <div className='dashboard'>
            <div className='title'>
              <span>Current Weather</span>
              <span>weekly forecast</span>
            </div>
            <div className='left_container'>
              <div className='weather-condition'>
                <div>
                  <h3>{country}</h3>
                  <p>{formatted}</p>
                </div>
                <div>
                  <Weathercard title="scattered clouds" value={`${data.main.temp} °C`} />
                </div>
                <img src={icons} className='cloud-image' alt='weather-image' />
              </div>
              <div>
                <p className='txt-center'>Air Contidions</p>
                <div className='weathercard_container'>
                  <Weathercard title="Temperature" value={`${data.main.temp} °C`} />
                  <Weathercard title="Humidity" value={`${data.main.humidity}%`} />
                  <Weathercard title="Wind" value={`${data.wind.speed} km/h`} />
                  <Weathercard title="clouds" value={`${data.clouds.all} km/h`} />
                </div>
              </div>
              <p className='txt-center'>Today's Forecast</p>
              <p className='txt-blue'>3 available forecast</p>
              <div className="forecast">
                <div className="forecast-card">
                  <p>15:00</p>
                  <img src={icons} alt="cloud-image" className='cloud-image' />
                  <h4>{data.main.temp} °C </h4>
                </div>

                <div className="forecast-card">
                  <p>18:00</p>
                  <img src={icons} alt="cloud-image" className='cloud-image' />
                  <h4>23°C</h4>
                </div>

                <div className="forecast-card">
                  <p>21:00</p>
                  <img src={icons} alt="cloud-image" className='cloud-image' />
                  <h4>19°C</h4>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="rightside_container">
        {forecast && forecast.map((day, index) => (
          <div key={index} className="week-card">
            <div className='flex-clm'>
              <span>
                {new Date(day.dt_txt).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </span>
              <span>{day.weather[0].description}</span>
            </div>

            <div className='flex-clm'>
              <span>{day.main.temp} °C</span>
              <span>{day.wind.speed} km/h</span>
            </div>
            <div className='flex-clm'>
              <span>{day.main.humidity}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home