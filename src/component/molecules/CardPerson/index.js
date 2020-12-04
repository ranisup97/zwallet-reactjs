import React from 'react'
import './card.css'
import {useSelector} from 'react-redux';
 const CardPerson = ({name,photo,amount,phone,status,id}) => {
    const stateGlobal = useSelector(state => state)
    console.log('dari card: ',stateGlobal.id)
    return (
        <>
            <div className="card-person shadow-sm " >
                <div style={{flex:1}}>
                         <div className="wrapper-card-person" >
                        <img alt=" " src={photo}  className="img-fluid" />
                        <div>
                             <h2 className="mt-0">{name}</h2>
                            <span className="mt-0">{phone && `+${phone}`}{status && `${status}`}</span>
                        </div>
                        </div>
                </div>
                <div >
                    <p className={stateGlobal.id === id ? 'mt-4 plus' : 'minus'}  >{amount && `${stateGlobal.id === id ? '+' : '-'}Rp${amount}`}</p>
                </div>
            </div>            
        </>
    )
}

export default  CardPerson;
