import React,{useState, useEffect} from 'react';

// Crea un select con talle unico o con letras
const Select = ({data}) => {

  const [ options, setOptions] = useState([])
  useEffect(() => {
    setOptions(data.talle)
  },[data])
  return (
    <select  id={`${data.id}select`}>
            <option>Talles</option>
      {
        options.map((e,i) => {
          return <option value={e} key={i} data-id={data.id}>{e}</option>
        })
      }
    </select>
  )
}

export default Select;