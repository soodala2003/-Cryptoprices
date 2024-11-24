import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

export default function Price (props) {
  const apiKey = "BCAD6FB5-86BF-4779-8796-17811BB066B7";

  const params = useParams();
  const symbol = params.symbol;

  const url = `http://rest.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${apiKey}`;

  // State to hold the coin data.
  const [coin, setCoin] = useState([]);

  // useEffect to run getCoin when component mounts.
  useEffect(() => {
    const getCoin = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setCoin(data);
        console.log(data);
      } catch(e) {
        console.error(e);
      }
    }; 
    getCoin();
  }, [url]);

  // loaded function for when data is fetched.
  const loaded = () => {
    return (
      <div>
        <h1>
          {coin.asset_id_base}/{coin.asset_id_quote}
        </h1>
        <h2>{coin.rate}</h2>
      </div>
    );
  };

  // Function for when data doesn't exist.
  const loading = () => {
    return <h1>Loading...</h1>;
  };

  // If coin has data, run the loaded function; otherwise, run loading.
  return coin && coin.rate ? loaded() : loading();
}
