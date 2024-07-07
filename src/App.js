import React, { useEffect, useState, useRef} from 'react';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Home from './components/Home';
import "bootstrap"
import axios from "axios";
import logo from './logo.svg';
import './App.css';

function App() {
  // const [data, setData] = useState(null);
  // const [city, setCity] = useState('Mumbai');
  // const inputRef = useRef(null);

  // useEffect(() => {
  //   const getContent = async (city) => {
  //     try {
  //       const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4debf817642222ddbfc43dab0fba7400&units=metric`);
  //       setData(res.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getContent(city);
  // }, [city]);

  // const handleClick = () => {
  //   if (inputRef.current.value) {
  //     setCity(inputRef.current.value);
  //   }
  // };

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} extact></Route>
      </Routes>

      </BrowserRouter>
      {/* <div className='container vcontainer'>
        <input
          type='text'
          placeholder='Enter city name'
          ref={inputRef}
        />
        <button onClick={handleClick}>Submit</button>
      </div>
      {data && (
        <div className='container vcontainer'>
          <h1 className='title'>Weather in {city}</h1>
          <h1 className='title'>Longitude: {data.coord.lon}</h1>
          <h1 className='title'>Latitude: {data.coord.lat}</h1>
          <hr />
          <div className='temp'>Temperature: {data.main.temp}°C</div>
        </div>
      )} */}
    </>
  );
}

export default App;
