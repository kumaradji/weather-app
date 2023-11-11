import React from 'react';
import { YMaps, Map } from "@pbe/react-yandex-maps";
import { usePosition } from "…./usePosition";

const YandexMap = () => {
  const { latitude, longitude, error } = usePosition();
  console.log(latitude)
  return (
    <YMaps>
      <div className="map">
          {error}
        <Мар defaultState={{ center: [latitude, longitude], zoom: 12 }} />
      </div>
    </YMaps>
  );
};

export default YandexMap;