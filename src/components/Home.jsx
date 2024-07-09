import React, { useEffect, useRef, useState } from "react";
import "../css/home.css";
import MapChart from "./MapView";
import axios from "axios";
import sicon from "../img/sicon.png";
import cicon from "../img/current.png";
import bgclear from "../img/bgclear.gif";
import classNames from 'classnames';


export default function Home() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("Mumbai");
  const [userLocation, setUserLocation] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const getContent = async (city) => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4debf817642222ddbfc43dab0fba7400&units=metric`
        );
        setData(res.data);
      } catch (error) {
        alert("City not found");
      }
    };
    getContent(city);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        // console.log(latitude)
      },
      (error) => {
        console.error("Error setting current location:", error);
      }
    );
  }, [city]);
  const backgroundClass = (data) => {
    if (data.weather[0].main === 'Clear' || data.weather[0].description === 'few clouds') {
        return 'clear-background';
    } else if (data.weather[0].main === 'thunderstorm') {
        return 'thunder-background';
    } else if (data.weather[0].description === 'mist') {
        return 'mist-background';
    }else if (data.weather[0].description === 'snow') {
      return 'snow-background';
    }else if (data.weather[0].main === 'Rain' || data.weather[0].main === 'Drizzle') {
      return 'rain-background';
    }else if (data.weather[0].main === 'Clouds') {
      return 'clouds-background';
    } else {
        return 'default-background';
    }
  };
  // setTimeout(() => {
  //   console.log(backgroundClass(data))
    
  // }, 500);

  const handleCurrentClick = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation[0]}&lon=${userLocation[1]}&appid=4debf817642222ddbfc43dab0fba7400&units=metric`
      );
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const convertTimestampToTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  };

  const handleClick = () => {
    setCity(inputRef.current.value);
    setTimeout(() => {
      inputRef.current.value = "";
    }, 1000);
  };

  return (
    <div>
      <div className="container container1 my-3">
        <div className="input-group mb-5">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            ref={inputRef}
          />
          <button
            id="btn1"
            className="btn"
            style={{ backgroundColor: "white", border: "1px solid black" }}
            placeholder="&#128270;"
            onClick={handleClick}
          >
            <img src={sicon} style={{ width: "25px" }}></img>
          </button>
          <button
            className="btn"
            style={{ backgroundColor: "white", border: "1px solid black" }}
            onClick={handleCurrentClick}
          >
            <img src={cicon} style={{ width: "30px" }}></img>
          </button>
        </div>
        {data && (
          <>
            <h1>{data.name}</h1>
            <div className={classNames("container","container2","d-flex",backgroundClass(data))}>
              <div className="fw-bold innern">
                <h1>
                  {data.main.temp.toString().split(".")[0]}°C
                  <img
                    src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                    style={{ width: "75px", marginLeft: "10px" }}
                  />
                </h1>
                <h1 id="h1">{data.weather[0].description.toUpperCase()}</h1>
              </div>
            </div>
            <div className="listcontainer">
              <ul>
                <li className="list">Feel's like: {data.main.feels_like.toString().split(".")[0]}°C</li>
                <li className="list">Humidity: {data.main.humidity}</li>
                <li className="list">Wind: {data.wind.speed}</li>
                <li className="list">Pressure: {data.main.pressure}</li>
                <li className="list">Sunrise: {convertTimestampToTime(data.sys.sunrise).slice(0,4)+"AM"}</li>
                <li className="list">Sunset: {convertTimestampToTime(data.sys.sunset).slice(0,4)+"PM"}</li>
              </ul>
            </div>
          </>
        )}
        <div className="mt-5" style={{ margin: 3 }}>
          {data && <MapChart lat={data.coord.lat} lon={data.coord.lon} />}
        </div>
      </div>
    </div>
  );
}
