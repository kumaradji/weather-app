// Weather.jsx
import React from "react";
import Table from "react-bootstrap/Table";

function WeatherData(props) {
  const { dt_txt, main } = props.weatherData;

  return (
    <Table striped bordered hover>
      <thead>
      <tr>
        <th>Дата и время</th>
        <th>Температура</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{dt_txt}</td>
        <td>{main.temp}&deg;C</td>
      </tr>
      </tbody>
    </Table>
  );
}

export default WeatherData;
