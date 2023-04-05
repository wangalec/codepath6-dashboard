import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

import './App.css'

function App() {

  const[data, setData] = useState();
  const[filteredData, setFilteredData] = useState();
  const[micro, setMicro] = useState(0);
  const[large, setLarge] = useState(0);
  const[num, setNum] = useState(0);
  
  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const response = await fetch(`https://api.openbrewerydb.org/v1/breweries?per_page=10`);
    const obj = await response.json();
    setData(obj);
    setFilteredData(obj);
    setNum(obj.length)

    const len = obj.length;
    let num_micro = 0;
    let num_large = 0;
    for(let i = 0; i < len; i++){
      if(obj[i].brewery_type == "micro") num_micro++;
      else num_large++;
    }
    setMicro(num_micro/len*100);
    setLarge(num_large/len*100);
  }

  const filterMicro = () => {
    const newData = [];
    for(let i = 0; i < num; i++){
      if(data[i].brewery_type == "micro")newData.push(data[i]);
    }
    setFilteredData(newData);
  }

  const filterLarge = () => {
    const newData = [];
    for(let i = 0; i < num; i++){
      if(data[i].brewery_type == "large") newData.push(data[i]);
    }
    setFilteredData(newData);
  }

  const filterAll = () => {
    setFilteredData(data);
  }

  return (
    <div className="App">
      <h1> Breweries </h1>
      <div>
        <h2> Filters: </h2>
        <button onClick={filterMicro}> Micro Only</button>
        <button onClick={filterLarge}> Large Only</button>
        <button onClick={filterAll}> All </button>
      </div>
      <div>
        <h2> Stats | Number of Breweries: {num} | Large Breweries: {large}% | Micro Breweries: {micro}% </h2>
      </div>
      <div>
        <ul>
          {data && Object.entries(filteredData).map(([item]) => (
            <>
              <h2> {filteredData[item].name} </h2>
              <h3> Type: {filteredData[item].brewery_type} </h3>
              <Link
                to = {`/detail/${filteredData[item].id}`}
              > Click for more detail
              </Link>
            </>
          ))
          }
        </ul>
        
      </div>
    </div>
  )
}

export default App
