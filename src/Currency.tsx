import React from 'react';

type CurrencyProps = {
  currencyOptions: string[];
  selectedCurrency: string;
  onChangeCurrency: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
  amount: string;
}

const Currency: React.FC<CurrencyProps> = (props) => {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;
  return (
    <div>
      <input
        type='number'
        className='input'
        value={amount}
        onChange={onChangeAmount}
      />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Currency