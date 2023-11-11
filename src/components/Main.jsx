import React, {useState} from "react";
import axios from "axios";
import WeatherDisplay from "./WeatherDisplay";
import CitySelector from "./CitySelector";
import YM from "./YM";

function Main() {
  const [name, setName] = useState("Moscow");
  const [weathers, setWeathers] = useState([]);
  const handleNameChange = (name) => {
    setName(name);
    const WeaUrl = "http://api.openweathermap.org/data/2.5/forecast?q="+name+",ru&APPID=fe4c586fd2c32a2e3e13d3ad079f4ea1&units=metric";
    axios.get(WeaUrl).then(res => {
      setWeathers(res.data.list);
    });
  }

  return (
    <main>
      <CitySelector onChange={handleNameChange}/>
      <YM />
      <WeatherDisplay name={name} weathers={weathers} />
    </main>
  );
}

export default Main;