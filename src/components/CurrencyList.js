import React, { useState, useEffect } from "react";
import "./index.css"
import Refresh from "./Refresh";

const CurrencyList = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.nbp.pl/api/exchangerates/tables/A');
      const data = await response.json();
      setCurrencies(data[0].rates);
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div>
      <h2>Aktualne kursy walut:</h2>
      <Refresh onRefresh={handleRefresh} />
      <table>
        <tr>
            <th>Nazwa</th>
            <th>Symbol</th>
            <th>Kurs</th>
        </tr>
          {currencies.map((currency, index) => (
            <tr key={index}>
                <td>{currency.currency}</td>
                <td>{currency.code}</td>
                <td>{" "} {currency.mid}</td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default CurrencyList;
