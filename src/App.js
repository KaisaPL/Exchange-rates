import {useState} from 'react'
import './App.css';

const URL = 'http://api.exchangeratesapi.io/v1/latest?access_key='
const API_KEY = '9C3tMdx9nJVyPZZtSJpldawf42EBzcF7'

function App() {
  const [eur, setEur] = useState(0)
  const [gbp, setGbp] = useState(0)
  const [rate, setRate] = useState(0)

  async function convert(e) {
    e.preventDefault();
    try {
      const address = URL + API_KEY;
      const response = await fetch(address);

      if(response.ok) {
        const json = await response.json();
        console.log(json.rates.GBP);
        setRate(json.rates.GBP);

        setGbp(eur * json.rates.GBP);
      } else {
        alert('Error retrieving exchange rate.');
        console.log(response);
      }
    }catch (err){
      alert(err);
    }
  }
  return (
    <div id='container'>
      <form onSubmit={convert}>
        <div>
          <label>EUR</label>&nbsp;
          <input type="number" step="0.01"
          value={eur} onChange={e => setEur(e.target.value)}/>
          <output>{rate}</output>
        </div>
        <div>
          <label>Gbp</label>
          <output>{gbp.toFixed(2)} €</output>
        </div>
        <div>
          <button>Calculate</button>
        </div>
      </form>
    </div>
  );
}

export default App;
