import React,{useState, useEffect} from 'react';

// Crea un select con talle unico o con letras
const Select = ({data}) => {
  const [ options, setOptions] = useState([])
  useEffect(() => {
    setOptions(data.talle)
  },[data])
  return (
        options.map((e,i) => {
          return <option value={e} key={i}>{e}</option>
        })
  )
}

export default Select;