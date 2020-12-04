import React,{Component} from 'react';
import { icArrowUpActive ,icGrid, icLogOut, icPlus,icUser} from '../../assets';
import { Navbar,Footer, NavigationMobile} from '../../component/molecules';
import './amount.css'
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
class Amount extends Component {

    state = {
        dataTransfer:[],
        available:'',
        form : {
            name :'',
            phone:'',
            notes: '',
            available:'',
            amount:'',
            idReceiver:'',
            photo:'',
            date:''
          },
    }
    componentDidMount()
    {
        let id = this.props.match.params.id;
        const token = localStorage.getItem("jwt");
        const headers = { headers: {'Authorization': `${token}`}}  
        axios.get(`${process.env.REACT_APP_API}/user/getuser?id=${id}`,headers)
        .then(res =>{
          console.log(res.data.data[0])
          this.setState({dataTransfer:res.data.data[0]}) 
        
        }).catch(err => {
          console.log(err)
        });

    }

    handleForm = (event) => {

        let  newForm  = this.state.form;
        newForm[event.target.name] = event.target.value;
        this.setState({
            newForm: newForm
        },
        ()=> {
          console.log(newForm);
        }
        )  
    }


    onContinue()
    {
        let arrbulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
        let menit = new Date().getMinutes();
        let jam = new Date().getHours();
        let Tahun = new Date().getFullYear();
        let Tanggal = new Date().getDate();
        let bulan = new Date().getMonth();
        let time = `${arrbulan[bulan]} ${Tanggal}, ${Tahun} - ${jam}.${menit}`;


        this.setState({
            form:{
                name :this.state.dataTransfer.fullName,
                phone:this.state.dataTransfer.phoneNumber,
                notes: this.state.form.notes,
                available:this.state.available,
                amount:this.state.form.amount,
                idReceiver:this.props.match.params.id,
                photo:this.state.dataTransfer.img,
                date:time
            }   
        },() => {
            // console.log('hasil dari local:',this.state.form);
            localStorage.setItem("dataTransfer", JSON.stringify(this.state.form));
            this.props.history.push('/transfer/review')
        })



    }

    countAvailable(e)
    {
        // console.log('hasil dari hitung',e.target.value)
        
        this.setState({
            available:this.props.userData.balance - e.target.value
        })
    }

    render() { 
        return ( 
            <>
                <div className="d-none d-sm-block">
                    <Navbar/>
                </div>
                
                    <div className="container content">
                        <div className="row">
                            <div className="col-3 bg-white shadow-lg">
                                <div className="sidebar sidebar_menu">
                                   <Link to="/dashboard">
                                    <a href="/dashboard" className="ml-md-4 d-block dashboard-tr text-center text-lg-left">
                                        <img alt="" src={icGrid} /> &nbsp; <span className="d-none d-md-inline">Dashboard</span>
                                    </a>
                                    </Link>
                                    <Link to="/transfer">
                                    <a href="receiver.html" className="ml-md-4 d-block transfer text-center text-lg-left">
                                        <div className="active-link"></div>
                                        <img alt="" src={icArrowUpActive} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Transfer</span>
                                    </a>
                                    </Link>
                                    <Link to="/top-up">
                                    <a href="top-up"  className="ml-md-4 d-block top-up-tr text-center text-lg-left" >
                                        <img alt="" src={icPlus} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Top Up</span>
                                    </a>
                                    </Link>
                                    <Link to="/user">
                                    <a href="/" className="ml-md-4 d-block profile-tr text-center text-lg-left">
                                        <img alt="" src={icUser} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Profile</span>
                                    </a>
                                    </Link>
                                    <a href="login.html" className="ml-md-4 d-block logout-am text-center text-lg-left">
                                        <img alt="" src={icLogOut} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Logout</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-12 col-sm-9">
                                <div class="amount-bank-box border-20">
                                    <div class="container">
                                        <div className="d-block d-sm-none">
                                            <NavigationMobile page="Transfer" to='/transfer'/>
                                        </div>
                                        <div class="d-flex align-items-start flex-column bd-highlight mb-3" >
                                            <div class="container">
                                                <p  class="mt-4 " id="transaction-history-big">Transfer To</p>
                                                
                                                <div class="amount-bank-panel-list">
                                                    <div class="d-flex flex-column bd-highlight mb-2 pt-3 pt-sm-3">
                                                        <div class="pl-4 bd-highlight ">
                                                            <div class="d-flex justify-content-start" >
                                                                <img alt="" src={this.state.dataTransfer.img} width="70" className="amount-image" />
                                                                <div class="ml-3 mt-2">
                                                                <div class="amount-bank-receiver-name  mb-xl-0 mb-lg-0 mb-md-0 mb-sm-2">{this.state.dataTransfer.fullName}</div>
                                                                <div class="amount-bank-receiver-number"> {this.state.dataTransfer.phoneNumber && '+'+this.state.dataTransfer.phoneNumber} </div>
                                                        
                                                                </div>
                                                                
                                                            </div>
                                                        </div>
                                                    </div>   
                                                </div>

                                                <div className='ml-3 d-none d-sm-block'>
                                                    <p  class="amount-bank-paragraph mt-5">Type the amount you want to transfer and then </p>
                                                    <p  class="amount-bank-paragraph">press continue to the next steps. </p>
                                                </div>

                                                <div class="d-flex justify-content-center align-items-center ">
                                                    <div class="d-flex flex-column bd-highlight mt-5  mb-5">
                                                    <div class="amount-bank-money-value p-2 mx-auto bd-highlight d-xl-none d-lg-none d-md-none d-sm-none">Rp.{this.state.available ? this.state.available  :  this.props.userData.balance} Available</div>
                                                        <input  class="amount-bank-money-input ml-3" type="text"  placeholder="0.00"  name="amount" onKeyUp={(e) => this.countAvailable(e)} value={this.state.form.amount} onChange={this.handleForm} style={{backgroundColor:'transparent'}}/>
                                                        <div class="amount-bank-money-value p-2 mx-auto bd-highlight d-none d-sm-block">Rp.{this.state.available ? this.state.available  :  this.props.userData.balance} Available</div>
                                                        <input class="amount-bank-note-transfer mt-5 ml-5" type="text" placeholder="Add Some Notes" name="notes" value={this.state.form.notes} onChange={this.handleForm}/>
                                                    </div>
                                                </div>

                                        </div>
                                    </div>

                                    <div class="d-flex justify-content-end">
                                        <div class="d-flex flex-row bd-highlight pr-3 mb-3">
                                            
                                            <button type="button" class="amount-bank-confirm-button" onClick={() => this.onContinue()}>
                                                Continue
                                            </button>
                                            
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        </div>


                    </div>                                              
                <Footer/>
            </>
         );
    }
}
 
const mapStateToProps = (state) => {
    return {
        userData: state
    }
}

const mapDispatchTOProps = (dispatch) => {
    return{
        handlePlus: (p) => dispatch({type:'BAGUS',value:p})
    }
}

export default connect(mapStateToProps,mapDispatchTOProps)(Amount);