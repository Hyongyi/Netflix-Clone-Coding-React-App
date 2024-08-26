import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [price, setPrice] = useState(0);
  const [selectedValue, setSelectedValue] = useState("");
  const [calculatedValue, setCalculatedValue] = useState(null);
  const onChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const settingPrice = (event) => {
    setPrice(event.target.value);
  };

  const calculatingValue = () => {
    if (price !== null && selectedValue !== null) {
      const result = Number(selectedValue) / price;
      setCalculatedValue(result);
    } else {
      setCalculatedValue(null);
    }
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => setCoins(json));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (coins.length > 0) {
      setSelectedValue(coins[0].quotes.USD.price);
    }
  }, [coins]);

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onChange}>
          {coins.map((coin) => (
            <option value={coin.quotes.USD.price} key={coin.id}>
              {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <input
        value={price}
        type="number"
        onChange={settingPrice}
        placeholder="Type number..."
      ></input>
      <button onClick={calculatingValue}>Calculate</button>
      <p>
        {calculatedValue !== null
          ? `Result = ${calculatedValue}`
          : "Enter value and click calculate button"}
      </p>
    </div>
  );
}

export default App;
