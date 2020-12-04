import React,{Component} from 'react';
import { icArrowUpActive ,icGrid, icLogOut,icPlus,icUser} from '../../assets';
import { Navbar,Footer} from '../../component/molecules';
import './adminTransfer.css'
import ReactPaginate from 'react-paginate'
import {Link} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

class AdminTransfer extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataTransaction  : [],
            perPage : 7,
            currentPage : 0,
            tableData : [],
            offset : 0,
            idDelete : 0,
            deleteAlert : false
        }
      this.handlePageClick = this.handlePageClick.bind(this);
    }

    handleId = (id) => {
        this.setState({ idDelete : id,
        })
    }

    handleRemove = (data) =>{
        const jwt = localStorage.getItem("jwt");
        const headers = { headers: {'Authorization': `Bearer ${jwt}`}}  
        axios.delete(`${process.env.REACT_APP_API}/transaction?id=${data} `, headers)
        .then(res => {
            axios.get(`${process.env.REACT_APP_API}/transaction/all`,headers)
            .then(res =>{
                
                let getDataTransfer = res.data.data
    
                var slice = getDataTransfer.slice(this.state.offset, this.state.offset + this.state.perPage)
                
    
                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    dataTransaction : res.data.data,
                    tableData : slice,
                    deleteAlert : true
                })
              console.log('data transfer axios: ',this.state.dataTransaction)
            }).catch(err => {
              console.log('data transfer axios error: ', err.message)
            });
        })  
        .catch(err => {
            console.log(err)
        })
    }



    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
		const data = this.state.dataTransaction;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			tableData:slice
		})
    }

    componentDidMount()
    {
        const jwt = localStorage.getItem("jwt");
        const headers = { headers: {'Authorization': `Bearer ${jwt}`}}  
        let data = qs.stringify({token:jwt});
        axios.post(`${process.env.REACT_APP_API}/profile/token`,data,headers)
        .then(res =>{
            if (res.data.data[0].role_id !== 1) {
                 this.props.history.push('/page-not-found')
            }
        }).catch(err => {
            console.error(err)
        });

        axios.get(`${process.env.REACT_APP_API}/transaction/all`)
        .then(res =>{
            
            let getDataTransfer = res.data.data

            var slice = getDataTransfer.slice(this.state.offset, this.state.offset + this.state.perPage)
            

            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                dataTransaction : res.data.data,
                tableData : slice
            })
          console.log('data transfer axios: ',this.state.dataTransaction)
        }).catch(err => {
          console.log('data transfer axios error: ', err.message)
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
                                    <a href="/dashboard" className="ml-md-4 d-block dashboard-tr text-center text-lg-left">
                                        <img alt="" src={icGrid} /> &nbsp; <span className="d-none d-md-inline">Dashboard</span>
                                    </a>
                                    </Link>
                                    <Link to="/admin/transfer">
                                    <a href="receiver.html" className="ml-md-4 d-block transfer text-center text-lg-left">
                                        <div className="active-link"></div>
                                        <img alt="" src={icArrowUpActive} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Transfer</span>
                                    </a>
                                    </Link>
                                    <Link to="/admin/top-up">
                                    <a href="top-up"  className="ml-md-4 d-block top-up-tr text-center text-lg-left" >
                                        <img alt="" src={icPlus} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Top Up</span>
                                    </a>
                                    </Link>
                                    <Link to="/admin/user">
                                    <a href="/" className="ml-md-4 d-block profile-tr text-center text-lg-left">
                                        <img alt="" src={icUser} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Profile</span>
                                    </a>
                                    </Link>
                                </div>
                                    <a href="/auth/logout" className="ml-md-4 d-block logout-rc text-center text-lg-left">
                                        <img alt="" src={icLogOut} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Logout</span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-12 col-sm-9" id="area">
                                <div className="body-area-card  h-100">
                                <div className="container-xl container-lg container-md pb-4">
                        
                                    <div className="row mx-1 pt-4 pb-4">

                                        <div className="col-12 mb-3">
                                            <div>
                                                <h3 className="admin-transfer-title">Data Transaction</h3>    
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            { this.state.deleteAlert ? (
                                                <div class="alert alert-success alert-dismissible fade show" role="alert">
                                                Success delete transfer history with id {this.state.idDelete} 
                                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                                </div>
                                            ):(<p className='display-none'></p>)
                                            }
                                        </div>

                                        <div className="col-12 table-responsive">
                                            <table className="table table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                    <th scope="col" class="admin-dashboard-col-text" >No</th>
                                                    <th scope="col" class="admin-dashboard-col-text" >ID</th>
                                                    <th scope="col" class="admin-dashboard-col-text" >Sender</th>
                                                    <th scope="col" class="admin-dashboard-col-text" >Receiver</th>
                                                    <th scope="col" class="admin-dashboard-col-text" >Amount</th>
                                                    <th scope="col" class="admin-dashboard-col-text" >Date & Time</th>
                                                    <th scope="col" class="admin-dashboard-col-text" >Notes</th>
                                                    <th scope="col" class="admin-dashboard-col-text" >Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                { this.state.tableData.map((item, index) => {

                                                    let bilangan = item.amountTransfer
                                                    var	reverse = bilangan.toString().split('').reverse().join(''),
                                                    rupiah 	= reverse.match(/\d{1,3}/g);
                                                    rupiah	= rupiah.join('.').split('').reverse().join('');

                                                    return(
                                                    <>
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{item.id}</td>
                                                        <td>{item.sendBy}</td>
                                                        <td>{item.receiver}</td>
                                                        <td>Rp. {rupiah}</td>
                                                        <td>{item.dateTransfer}</td>
                                                        <td>{item.note}</td>
                                                        <td><button className="admin-transfer-button-delete" data-toggle="modal"  data-target="#exampleModal" onClick={() => this.handleId(item.id)}>Delete</button></td>
                                                        </tr>
                                                    
                                                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div class="modal-dialog" role="document">
                                                            <div class="modal-content">
                                                            <div class="modal-body">
                                                               <p>Are you sure want delete transaction with id {this.state.idDelete}</p> 
                                                            </div>

                                                            <div class="d-flex justify-content-end">
                                                                <button type="button" class="btn btn-secondary mr-2" data-dismiss="modal">Close</button>
                                                                <button type="button" class="admin-user-button-delete-modal" onClick={() => this.handleRemove(this.state.idDelete)} data-dismiss="modal">Delete</button>
                                                            </div>

                                                            </div>
                                                        </div>
                                                        </div>
                                                    </>    
                                                    )
                                                })
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                        </div>


                                        <div className="col-12  mb-xl-0 mb-lg-0 mb-md-0 mb-sm-5 mb-5 mx-0">
                                        <div className="d-flex justify-content-center">

                                        <ReactPaginate
                                        previousLabel={"prev"}
                                        nextLabel={"next"}
                                        breakLabel={"..."}
                                        breakClassName={"break-me"}
                                        pageCount={this.state.pageCount}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={this.handlePageClick}
                                        containerClassName={"pagination"}
                                        subContainerClassName={"pages pagination"}
                                        activeClassName={"active"}/>                     

                                        </div>
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
                        <img src={icArrowUpActive} alt=""/>
                        <span class="navbar-active-res">Transfer</span>
                        </a>

                        <a href="/admin/top-up" class="nav__link">
                        <img src={icPlus} alt=""/>
                        <span class="navbar-non-res">Top up</span>
                        </a>

                        <a href="/admin/user" class="nav__link">
                        <img src={icUser} alt=""/>
                        <span class="navbar-non-res">profile </span>
                        </a>


                        <a href="/auth/logout" class="nav__link">
                        <img src={icLogOut} alt=""/>
                        <span class="navbar-non-res">Log Out</span>
                        </a>

                    </div>                                             
                <Footer/>
            </>
         );
    }
}
 
export default AdminTransfer;