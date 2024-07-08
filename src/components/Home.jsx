import React, { useEffect, useRef, useState } from "react";
import "../css/home.css";
import MapChart from "./MapView";
import axios from "axios";


export default function Home() {

  const [data, setData] = useState(null);
  const [city, setCity] = useState('Mumbai');
  const [userLocation,setUserLocation]=useState([])
  const inputRef = useRef(null);

  useEffect(() => {
    const getContent = async (city) => {
      try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4debf817642222ddbfc43dab0fba7400&units=metric`);
        setData(res.data);
      } catch (error) {
       alert("City not found");
      }
    };
    getContent(city);
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        // console.log(latitude)
      },
      error => {
        console.error('Error setting current location:', error);
      }
    );
  }, [city]);


  const handleCurrentClick=async()=>{
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${userLocation[0]}&lon=${userLocation[1]}&appid=4debf817642222ddbfc43dab0fba7400&units=metric`);
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClick = () => {
    setCity(inputRef.current.value);
    setTimeout(() => {
      inputRef.current.value=''
    }, 1000);
  };
  return (
    <div>
      <div className="container container1 my-3">
        <div className="input-group mb-5">
          <input
            type="text"
            className="form-control"
            placeholder='Enter city name'
            ref={inputRef}
          />
          <button
            id="btn1"
            className="btn btn-outline-secondary"
            // style={{width:"9rem"}}
            onClick={handleClick}
          >
            Search
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={handleCurrentClick}
          >
            Current
          </button>
        </div>
        {data &&( 
          <>
            <h1>{data.name}</h1>
        <div className="container container2 d-flex" style={{ border:"2px solid red" }}>
            <div className="fw-bold innern">
              <h1>{data.main.temp.toString().split('.')[0]}°C<img src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} style={{ width: "75px", marginLeft:"10px"}} /></h1>
              <h1 id="h1">{data.weather[0].description}</h1>
            </div>
            <div>
              <br />
              <div className="listcontainer" style={{ marginRight: "10px" }}>
                <ul>
                  <li className="list">Feel's like:{data.main.feels_like.toString().split('.')[0]}°C</li>
                  <li className="list">Humidity:{data.main.humidity}</li>
                  <li className="list">Wind:{data.wind.speed}</li>
                  <li className="list">City:{data.name}</li>
                </ul>
              </div>
            </div>
        </div>
            </>
        )}
        <div className="mt-5" style={{margin:3}}>
          {data&&(
            <MapChart lat={data.coord.lat} lon={data.coord.lon}/>
          )}
        </div>
      </div>
    </div>
  );
}
