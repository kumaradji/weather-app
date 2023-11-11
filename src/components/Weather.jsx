import React, {useState} from "react";
import Table from "react-bootstrap/Table";



function weatherData(props)  {

  return (
    <div className='weather'>
      <h2>{props.weatherData.dt_txt}</h2>
      <span className="badge badge-info">{props.weatherData.main.temp}<sup> o</sup>C</span>
    </div>
  )

}

export default weatherData;