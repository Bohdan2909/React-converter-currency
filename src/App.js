import React from 'react';
import { Block } from './Block';
import './index.scss';
import { useEffect, useState } from 'react';

function App() {
  const [fromCurrency, setFromCurrency] = useState('UAH');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);
  // const [rates, setRates] = useState({});
  const ratesRef = React.useRef({});
  useEffect(() => {
  fetch('https://cdn.cur.su/api/latest.json')
  .then(res => res.json())
  .then(json => {
    // setRates(json.rates);
    ratesRef.current = json.rates;
    onChangeToPrice(1);
  })
  .catch(err => console.log(err))
  .finally(()=>{});
  }, []);
  

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
      setToPrice(result.toFixed(3));
      setFromPrice(value);

  };
   const onChangeToPrice = (value) => {
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
     setFromPrice(result.toFixed(3));
     setToPrice(value);
   };

   useEffect(() => {
   onChangeFromPrice(fromPrice); 
   }, [fromCurrency]);

    useEffect(() => {
      onChangeToPrice(toPrice);
    }, [toCurrency]);
   
  return (
    <div className="App">
      <Block value={fromPrice}
             currency={fromCurrency} 
             onChangeCurrency={setFromCurrency}
             onChangeValue={onChangeFromPrice}
             />
      <Block value={toPrice} 
             currency={toCurrency}  
             onChangeCurrency={setToCurrency}
             onChangeValue={onChangeToPrice}
             
             />
    </div>
  );
}

export default App;
