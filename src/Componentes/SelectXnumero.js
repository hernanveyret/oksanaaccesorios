import React from 'react';

// Crea un select con talles por numeracion
const SelectXnumero = ({data}) => {
    //let talles =  data.talleFin - data.talleInit
    let talles = [] 
    for ( let i = data.talleInit; i <= data.talleFin; i++){
        talles.push(i)
    }      
    return (
         talles.map((e,i) => <option key={i} value={e}>{e}</option>)
    )
}

export default SelectXnumero;