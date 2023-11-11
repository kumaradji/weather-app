import React from "react";
import { YMaps, Map } from "react-yandex-maps";

function YM() {
  return (
    <YMaps query={{ apikey: 'ваш-ключ-api' }}>
      <div>
        <Map
          defaultState={{ center: [61.24, 73.39], zoom: 10 }}
          style={{ width: '100%', height: '400px' }}
        />
      </div>
    </YMaps>
  );
}

export default YM;
