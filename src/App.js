import React, { useEffect, useRef, useState } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {

  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD')
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);

  //const [rates, setRates] = useState({});
  const rates = useRef({});

  useEffect(() => {
    fetch('https://openexchangerates.org/api/latest.json?app_id=2c2d1b63ccea4c17b95bf54615fa336b&base=USD')
      .then(res => res.json())
      .then(json => {
        rates.current = json.rates;
    onChangeToPrice(1);
  })
    .catch(err => {
      console.warn(err);
      alert('Konnte keine Informationen erhalten');
    })
}, []);

const onChangeFromPrice = (value) => {
  const price = value / rates.current[fromCurrency];
  const result = price * rates.current[toCurrency];
  setToPrice(result.toFixed(2));
  setFromPrice(value);
}


const onChangeToPrice = (value) => {
  const result = (rates.current[fromCurrency] / rates.current[toCurrency]) * value;
  setFromPrice(result.toFixed(2))
  setToPrice(value);
}


useEffect(() => {
  onChangeFromPrice(fromPrice);
}, [fromCurrency, fromPrice]);

useEffect(() => {
  onChangeToPrice(toPrice);
}, [toCurrency], toPrice);

return (
  <div className="App">
    <Block value={fromPrice} currency={fromCurrency} onChangeValue={onChangeFromPrice} onChangeCurrency={setFromCurrency} />
    <Block value={toPrice} currency={toCurrency} onChangeValue={onChangeToPrice} onChangeCurrency={setToCurrency} />
  </div>
);
}

export default App;
