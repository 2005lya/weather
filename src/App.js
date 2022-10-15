import react, { useEffect, useState } from "react";
import Weather from './components/Weather';


function App() {

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position){
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        // console.log(lat, long)
      });

      await fetch(`https://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=civillight&output=json`)
      .then( res  => res.json())
      .then(result => {
        setData(result)
        console.log(result)
      });
    }
      fetchData();
    }, [lat, long])

  return (
    <div className="App">
        {(typeof data.init != 'undefined') ? (
        
        <Weather weatherData={data}/>
      ): (
        <div>Loading ...</div>
      )}
    </div>
  );
}

export default App;
