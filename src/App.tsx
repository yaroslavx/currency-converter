import React, { useEffect, useState } from 'react';
import { AppWrapper } from './App.styles';
import CurrencyRow from './Currency';

const BASE_URL = 'https://api.apilayer.com/exchangerates_data/latest';

// API_KEY должен быть в process.env, но немного не вышло(
const myHeaders: HeadersInit = new Headers();
myHeaders.append('apikey', "hUZaFGYcM1qCJSfUqfE8GFansgDkGfBu");

type requestOptionsType = {
  method: string;
  redirect: RequestRedirect;
  headers: HeadersInit,
}

const requestOptions: requestOptionsType = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders,
};

const App: React.FC = () => {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [amount, setAmount] = useState<number>(0);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch('https://api.ipregistry.co/?key=f6wmrq8vgswe46w1')
      .then((res) => res.json())
      .then((data) => {
        setFromCurrency(data.currency.code);
        setToCurrency('USD');
      });
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(
        `${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`,
        requestOptions
      )
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
    setAmountInFromCurrency(true);
  }

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
    setAmountInFromCurrency(false);
  }

  return (
    <AppWrapper>
      <div className='app'>

        <h1 className='title'>Convert</h1>
        <div className='container'>

          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={(e) => setFromCurrency(e.target.value)}
            onChangeAmount={handleFromAmountChange}
            amount={String(fromAmount)}
          />
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={(e) => setToCurrency(e.target.value)}
            onChangeAmount={handleToAmountChange}
            amount={String(toAmount)}
          />
        </div>
      </div>
    </AppWrapper>
  );
}

export default App;
