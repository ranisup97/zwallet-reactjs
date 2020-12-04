import React,{Component} from 'react';
import { icArrowUp ,icGrid, icLogOut,icPlusActive,icUser} from '../../assets';
import { Navbar,Footer} from '../../component/molecules';
import './adminTopup.css'
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

const editProccess = () =>{

}

const onDelete = ( id) =>{
            
    swal({
        title: "Are you sure ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
        // deleteTopup(id);
            console.log(" delete topup dengan id =" + id);
            const token = JSON.parse(localStorage.getItem("token"));
            const headers = { headers: {'Authorization': `Bearer ${token.accessToken}`}} 
            axios.delete(`${process.env.REACT_APP_API}/topup/` + id, headers)
            .then(res =>{
                console.log(res.data.data)
              }).catch(err => {
                console.log(err)
              });
          swal("Delete Success!", {
            icon: "success",
          });
          window.location.reload();
        } else {
          swal("Delete Failed!");
        }
      });
}
class AdminTopup extends Component {

    state = {
        data : []
    }

    


    componentDidMount()
    {
        const jwt = localStorage.getItem("jwt");
        const headers = { headers: {'Authorization': `${jwt}`}}

        axios.get(`${process.env.REACT_APP_API}/topup/all`,headers)
        .then(res =>{
          console.log(res.data.data)
          this.setState({data:res.data.data});
        
        }).catch(err => {
          console.log(err)
        });

    }


    render() { 
        return ( 
            <>
                <Navbar/>
                    
                    <div className="container content">
                        <div className="row">
                            <div className="col-3 bg-white shadow-lg sidebar_menu">
                            <div className="sidebar h-100 d-flex pb-5" style={{flexDirection: 'column'}}>
                              <div style={{flex: 1}}> 
                                <Link to="/admin">
                                    <a href="/dashboard" className="ml-md-4 d-block dashboard-tp text-center text-lg-left">
                                        <img alt="" src={icGrid} /> &nbsp; <span className="d-none d-md-inline">Dashboard</span>
                                    </a>
                                </Link>
                                <Link to="/admin/transfer">
                                    <a href="/transfer" className="ml-md-4 d-block transfer-tp text-center text-lg-left">
                                        <img alt="" src={icArrowUp} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Transfer</span>
                                    </a>
                                </Link>
                                <Link to="/admin/top-up">
                                    <a href="/admin/top-up" className="ml-md-4 d-block top-up-tp text-center text-lg-left">
                                        <div className="active-link"></div>
                                        <img alt="" src={icPlusActive} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Top Up</span>
                                    </a>
                                </Link>
                                <Link to="/admin/user">
                                    <a href="/" className="ml-md-4 d-block profile-tp text-center text-lg-left">
                                        <img alt="" src={icUser} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Profile</span>
                                    </a>
                                </Link>
                                </div>
                                    <a href="/auth/logout" className="ml-md-4 d-block logout-tp text-center text-lg-left">
                                        <img alt="" src={icLogOut} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Logout</span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-12 col-sm-9" id="area">
                                <div className="body-area-card  h-100">


                                    <h1>How To Top Up</h1>
                
                                    <div className="row">
                                        <div className="col-12 mb-xl-0 mb-lg-0  mb-md-0 mb-sm-0 mb-5">

                                            {
                                                this.state.data.map((item,index) => {
                                                    return(
                                                        // <div className="" key={item.id} >
                                                        
                                                            <div className="row" key={index}>
                                                                <div className="col-12 col-lg-9 top-up">
                                                                <table className="table table-striped " id="mytable" >
                                                                    
                                                                        <tr>    
                                                                            <th><p className="font-weight-normal"><span className="number">{item.stepNumber}</span>{item.instruction}</p>
                                                                            <button type="submit" className="btn btn-sm btn-info text-center edit" onClick={() => editProccess()}>Edit</button>
                                                                            <button className="btn btn-sm btn-danger delete ml-lg-1 mb-lg-0 mt-lg-0 mt-2 " onClick={() => onDelete(item.id)}>Delete</button></th>
                                                                            
                                                                        </tr>
                                                                    
                                                                </table>
                                                                </div>
                                                            </div>
                                                        
                                                    
                                                    // </div>
                                                    )
                                                })
                                            }
                                        
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>  

                    <div class="nav d-sm-none">
                    
                        <a href="/admin" class="nav__link">
                        <img src={icGrid} alt=""/>
                        <span class="navbar-non-res" >Dashboard</span>
                        </a>


                        <a href=" /admin/transfer" class="nav__link ">
                        <img src={icArrowUp} alt=""/>
                        <span class="navbar-non-res">Transfer</span>
                        </a>

                        <a href="/admin/top-up" class="nav__link">
                        <img src={icPlusActive} alt=""/>
                        <span class="navbar-active-res">Top up</span>
                        </a>

                        <a href="/admin/user" class="nav__link">
                        <img src={icUser} alt=""/>
                        <span class="navbar-non-res">profile </span>
                        </a>


                        <a href="/auth/logout" class="nav__link asdf">
                        <img src={icLogOut} alt=""/>
                        <span class="navbar-non-res">Log Out</span>
                        </a>

                    </div>                                                             

                <Footer/>
            </>
         );
    }
}
 
export default AdminTopup;