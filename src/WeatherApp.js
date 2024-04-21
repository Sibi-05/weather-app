import { IoSearch } from "react-icons/io5";
import "./WeatherApp.css";
import cloud_icon from "./Assets/cloud.png";
import humidity_icon from "./Assets/humidity.png";
import clear_icon from "./Assets/clear.png";
import haze_icon from "./Assets/haze.png";
import drizzle_icon from "./Assets/drizzle.png";
import rain_icon from "./Assets/rain.png";
import snow_icon from "./Assets/snow.png";
import wind_icon from "./Assets/wind.png";
import { useState } from "react";

const WeatherApp = () => {
  let [city, setCity] = useState(null);
  const [temp, setTemp] = useState(0);
  const [hum, setHum] = useState(0);
  const [speed, setSpeed] = useState(0);

  const [name, setName] = useState("Location");
  const [icon, setIcon] = useState("cloud_icon");

  const apiKey = "475e91538008f6417c747c5d08a068ec";
  const Search = async () => {
    try {
      let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${apiKey}`;
      let res = await fetch(URL);
      let data = await res.json();

      setTemp(data.main.temp);
      setCity(data.name);
      setName(data.name);
      setHum(data.main.humidity);
      setSpeed(data.wind.speed);

      console.log(data);
      console.log(data.weather[0].main);
      let img = data.weather[0].main;
      switch (img) {
        case "Clouds":
          setIcon(cloud_icon);
          break;
        case "Clear":
          setIcon(clear_icon);
          break;
        case "Haze":
          setIcon(haze_icon);
          break;
        case "Rain":
          setIcon(rain_icon);
          break;
        case "Snow":
          setIcon(snow_icon);
          break;
        case "Drizzle":
          setIcon(drizzle_icon);
          break;
        default:
          setIcon(haze_icon);
          break;
      }
    } catch (error) {
      console.log(error + "give the correct name");
    }
  };

  return (
    <div>
      <header>
        <h1>Weather Forecasting</h1>
      </header>
      <div className="container">
        <div className="top-bar">
          <input
            onChange={(e) => {
              setCity(e.target.value);
            }}
            type="text"
            className="input-Box"
            placeholder="Enter the location"
          ></input>
          <button type="submit" className="button" onClick={() => Search()}>
            <IoSearch />
          </button>
        </div>

        <div className="weatherImage">
          <img src={icon} alt="" />
        </div>
        <div className="weather-temp">{temp}°C</div>
        <div className="weather-location">{name}</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt=" " className="icon" />
            <div className="data">
              <div className="humidity-percent">{hum}%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt=" " className="icon" />
            <div className="data">
              <div className="humidity-percent">{speed} km/h</div>
              <div className="text">wind speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
