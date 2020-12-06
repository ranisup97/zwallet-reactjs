import React, { useEffect,useState} from 'react'
import { icBell, icArrowUpMin } from '../../../assets';
import './navbar.css';
import axios from 'axios';
// import qs from 'qs';
import {Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import NavigationMobile from '../NavigationMobile';

 const Navbar = ({hidden}) => {

    const dispacth = useDispatch();
    const stateGlobal = useSelector(state => state)
    const [history,setHistory] = useState([])
    console.log('dari state global: ',stateGlobal)
    useEffect(() => {



            var token = localStorage.getItem("jwt");
            const headers = { headers: {'Authorization': `${token}`}}  
            axios.get(`${process.env.REACT_APP_API}/user/home`,headers)
            .then(res =>{
                console.log('data notification: ',res.data.data.data)
                if (res.data.data.data) {
                  setHistory(res.data.data.data)
                }
                
            
            }).catch(err => {
              console.log('data transfer axios error: ', err.message)
            });
            dataApi(token);



            console.log('dari histor lll',history)
            
    },[])
    
    const dataApi = (token) => {
        
        const headers = { headers: {'Authorization': `${token}`}}  
        axios.get(`${process.env.REACT_APP_API}/user`,headers)
        .then(res =>{
            // console.log('data dari navbar: ',res.data.data[0])
            dispacth({type:'SET_DATA',value:res.data.data[0]});

        }).catch(err => {
            console.error(err)
        });
    }
  if(hidden){
    return(
        <>
        </> 
    )
  }
  return (
    <>

      <nav className="navbar navbar-dashboard "  >
        <div className="container">
          <a href="/dashboard" className="navbar-brand d-none d-md-block" >Zwallet</a>

          <section className="profile justify-content-between">
            <div className="row justify-content-between">
              <div className="col-10">
                <div className="row">
                  <div className="col-3">
                    <Link to="/profile">
                      <img alt="" src={stateGlobal.photo} />
                    </Link>

                  </div>
                  <div className="col-9 " >
                    <p className="profile-hello d-block d-md-none mb-0">&nbsp;Hello,</p>
                    <h4 className="profile-name mt-0">&nbsp;{stateGlobal.fullName}</h4>
                    <p className="phone-number d-none d-md-block">&nbsp;{stateGlobal.phone && '+'+stateGlobal.phone }</p>

                  </div>
                </div>
              </div>

              <div className="col-2 d-flex justify-content-end  ">
                <img alt="" className="mb-2 icBell" src={icBell} data-toggle="modal" data-target="#modalNotif" />
              </div>
            </div>

          </section>

        </div>

      </nav>



      <div className="modal fade position-modal" id="modalNotif"  data-keyboard="false" tabindex="-1" aria-labelledby="modalNotifLabel" aria-hidden="true">
        <div className="modal-dialog modal-notification">
          <div className="modal-content">

            {/* <div className="modal-header border-0 p-0 ">
              <h5 >Edit your profile</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><img alt="" src={icX} /></span>
              </button>
            </div> */}
            {/* <div className="modal-body p-0"> */}
            <button type="button" className="close w-100 p-0 mb-5 d-sm-none" data-dismiss="modal" aria-label="Close" style={{position:'absolute',opacity:1}}>
            <span aria-hidden="true"  >
                 <NavigationMobile page="Notification" />
            </span>
          </button>
            <div className='navv mb-5'>

            </div>
            <text className='helpertext mb-3'>Today</text>
            
            {
              // history
                // console.log('histor: ',history)
                history.map(his => {
                return(
                  <div className="cardss mb-3" key={his.id}>
                    <span aria-hidden="true"><img className="iconss" alt="" src={icArrowUpMin} /></span>
                    <div>
                      <text className='helpertext'>Tranfered from jhosua lee</text>
                      <h5 className="titless">Rp{his.amountTransfer}</h5>
                    </div>
                 </div>
                )
              })
            }
            
             
            {/* </div> */}
          </div>
        </div>
      </div>



    </>
  )
}

export default Navbar;
