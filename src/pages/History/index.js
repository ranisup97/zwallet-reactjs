import React,{useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import { icArrowUp , icGridActive, icLogOut,icPlus,icUser,icArrowExpense,icArrowIncome} from '../../assets';
import { Navbar,Footer, CardPerson, NavigationMobile} from '../../component/molecules';
import './history.css'
import {Link} from 'react-router-dom';
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DateRangePickerCalendar, START_DATE } from 'react-nice-dates'
import './historyDate.css'

import axios from 'axios';

function History(){

        

        const [historyTransfer, setHistoryTransfer] = useState([])
        const [historyTransferIncomeWeek,setHistoryTransferIncomeWeek] = useState([])
        const [historyTransferOutcomeWeek,setHistoryTransferOutcomeWeek] = useState([])
        const [historyTransferIncomeMonth,setHistoryTransferIncomeMonth] = useState([])
        const [historyTransferOutcomeMonth,setHistoryTransferOutcomeMonth] = useState([])
        const [sort, setSort] = useState(false)
        const [showOutcome, setShowOutcome] = useState(false)

        const [showIncome, setShowIncome] = useState(false)

        
        const [modalShow , setModalShow] = useState(false)
        const [pagination, setPagination] = useState(false)
        const [paginationLimit, setPaginationLimit] = useState(2)
        const [startDate, setStartDate] = useState()
        const [endDate, setEndDate] = useState()
        const [focus, setFocus] = useState(START_DATE)

        const stateGlobal = useSelector(state => state)

        const sortOutcome = () => {
            setShowOutcome(true)
            setSort(true)
        }



        const sortIncome = () => {
            setShowIncome(true)
            setSort(true)
        }
        
        const openCalendar = () => {
            setModalShow(true)
        }

        const closeCalendar = () => {
            setModalShow(false)
        }

        const handleFocusChange = newFocus => {
            setFocus(newFocus || START_DATE)
        }
    
        


        function handlePagination(){
        
            setPagination(true)
            setPaginationLimit(4)
            console.log(paginationLimit)
            
        }

    function handleShowLessMore(){
        setPagination(false)
        setPaginationLimit(2)
    }

    useEffect(() => {
            const token = localStorage.getItem("jwt");
            const headers = { headers: {'Authorization': `${token}`}}  
        axios.get(`${process.env.REACT_APP_API}/transaction/history`,headers)
        .then(res =>{
        
            setHistoryTransferIncomeWeek(res.data.data.inWeek)
            setHistoryTransferOutcomeWeek(res.data.data.outWeek)
            setHistoryTransferOutcomeMonth(res.data.data.outMonth)
            setHistoryTransferIncomeMonth(res.data.data.inMonth)
            setHistoryTransfer(res.data.data.data)

        
          console.log('ini data did mount: ', historyTransfer)
        }).catch(err => {
          console.log('data transfer axios error: ', err.message)
        });
        }, [])

    

    


    
        return ( 
            <>
                <div className="d-none d-sm-block">
                <Navbar/>
                </div>
                    <div className="container content">
                        <div className="row">
                            <div className="col-3 bg-white shadow-lg sidebar_menu">
                            <div className="sidebar h-100 d-flex pb-5" style={{flexDirection: 'column'}}>
                              <div style={{flex: 1}}> 
                                <Link to="/dashboard">
                                    <a href="/dashboard" className="ml-md-4 d-block  top-up-tp  text-center text-lg-left">
                                        <div className="active-link"></div>
                                        <img alt="" src={icGridActive} /> &nbsp; <span className="d-none d-md-inline">Dashboard</span>
                                    </a>
                                </Link>
                                <Link to="/transfer">
                                    <a href="/transfer" className="ml-md-4 d-block transfer-tp text-center text-lg-left">
                                        <img alt="" src={icArrowUp} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Transfer</span>
                                    </a>
                                </Link>
                                <Link to="/top-up">
                                    <a href="/top-up" className="ml-md-4 d-block  dashboard-tp text-center text-lg-left">
                                        <img alt="" src={icPlus} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Top Up</span>
                                    </a>
                                </Link>
                                <Link to="/profile">
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
                                <div className="body-area-history">
                                <div className="d-sm-none">
                                     <NavigationMobile page="History" to="/dashboard"/>
                                </div>
                                    <h1 className="d-none d-sm-block">Transaction History</h1>
                                    <p>This Week</p>
                                        
                                        { sort ? 
                                            (historyTransferIncomeWeek.slice(0,paginationLimit).map(history => {
                                                return(
                                                    <>
                                                    <div class="history-panel-list mb-2">
                                                        <div class="d-flex flex-column bd-highlight mb-5">
                                                            <div class="pl-2 bd-highlight mt-3">
                                                                <div class="d-flex justify-content-start">
                                                                    <img src={history.img} alt="" />
                                                                    <div class="ml-3 mt-2">
                                                                    <div class="name-history">{history.receiveBy}</div>
                                                                    <div class="status-history">Transfer</div>
                                                            
                                                                    </div>
                                                                    
                                                                    {stateGlobal.id == history.sendBy ? 
                                                                    ( 
                                                                        <div class="value-history-add  ml-auto mr-3 mt-3">
                                                                        +Rp {history.amountTransfer}
                                                                        </div>)
                                                                    : 
                                                                    ( 
                                                                        <div class="value-history-min  ml-auto mr-3 mt-3">
                                                                        -Rp {history.amountTransfer}
                                                                        </div>)
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>                                                                                                           
                                                    </div>
                                
                                                    </>
                                                )
                                            }))
                                            
                                             : 
                                            (historyTransfer.slice(0,paginationLimit).map(history => {
                                                return(
                                                    <>
                                                    <div class="history-panel-list mb-2">
                                                        <div class="d-flex flex-column bd-highlight mb-5">
                                                            <div class="pl-2 bd-highlight mt-3">
                                                                <div class="d-flex justify-content-start">
                                                                    <img src={history.img} alt="" />
                                                                    <div class="ml-3 mt-2">
                                                                    <div class="name-history">{history.receiveBy}</div>
                                                                    <div class="status-history">Transfer</div>
                                                            
                                                                    </div>
                                                                    
                                                                    {stateGlobal.id == history.sendBy ? 
                                                                    ( 
                                                                        <div class="value-history-add  ml-auto mr-3 mt-3">
                                                                        +Rp {history.amountTransfer}
                                                                        </div>)
                                                                    : 
                                                                    ( 
                                                                        <div class="value-history-min  ml-auto mr-3 mt-3">
                                                                        -Rp {history.amountTransfer}
                                                                        </div>)
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>                                                                                                           
                                                    </div>
                                
                                                    </>
                                                )
                                            }))
                                        }


                                        

                                
                                    <div class="d-flex justify-content-center">
                                        { pagination ? (<button className='load-more-button' onClick={() => handleShowLessMore()}>Show less more</button>) : (
                                            <button className='load-more-button' onClick={() => handlePagination()}>Show Load more</button>
                                        )}
                                    </div>

                                    <p className="mt-3">This Month</p>

                                    { sort ? 
                                            (historyTransferIncomeWeek.slice(0,paginationLimit).map(history => {
                                                return(
                                                    <>
                                                    <div class="history-panel-list mb-2">
                                                        <div class="d-flex flex-column bd-highlight mb-5">
                                                            <div class="pl-2 bd-highlight mt-3">
                                                                <div class="d-flex justify-content-start">
                                                                    <img src={history.img} alt="" />
                                                                    <div class="ml-3 mt-2">
                                                                    <div class="name-history">{history.receiveBy}</div>
                                                                    <div class="status-history">Transfer</div>
                                                            
                                                                    </div>
                                                                    
                                                                    {stateGlobal.id == history.sendBy ? 
                                                                    ( 
                                                                        <div class="value-history-add  ml-auto mr-3 mt-3">
                                                                        +Rp {history.amountTransfer}
                                                                        </div>)
                                                                    : 
                                                                    ( 
                                                                        <div class="value-history-min  ml-auto mr-3 mt-3">
                                                                        -Rp {history.amountTransfer}
                                                                        </div>)
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>                                                                                                           
                                                    </div>
                                
                                                    </>
                                                )
                                            }))
                                            
                                             : 
                                            (historyTransfer.slice(0,paginationLimit).map(history => {
                                                return(
                                                    <>
                                                    <div class="history-panel-list mb-2">
                                                        <div class="d-flex flex-column bd-highlight mb-5">
                                                            <div class="pl-2 bd-highlight mt-3">
                                                                <div class="d-flex justify-content-start">
                                                                    <img src={history.img} alt="" />
                                                                    <div class="ml-3 mt-2">
                                                                    <div class="name-history">{history.receiveBy}</div>
                                                                    <div class="status-history">Transfer</div>
                                                            
                                                                    </div>
                                                                    
                                                                    {stateGlobal.id == history.sendBy ? 
                                                                    ( 
                                                                        <div class="value-history-add  ml-auto mr-3 mt-3">
                                                                        +Rp {history.amountTransfer}
                                                                        </div>)
                                                                    : 
                                                                    ( 
                                                                        <div class="value-history-min  ml-auto mr-3 mt-3">
                                                                        -Rp {history.amountTransfer}
                                                                        </div>)
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>                                                                                                           
                                                    </div>
                                
                                                    </>
                                                )
                                            }))
                                        }
                                    
                                    <div class="d-flex justify-content-center">
                                        { pagination ? (<button className='load-more-button' onClick={() => handleShowLessMore()}>Show less more</button>) : (
                                            <button className='load-more-button' onClick={() => handlePagination()}>Show Load more</button>
                                        )}
                                    </div>

                                </div>

                            </div>
                        </div>
                                <div class="d-flex justify-content-between mb-5 mx-4 d-md-none  d-block ">
                                <div>
                                    <button class="button-sort" onclick={() => sortOutcome()}>
                                        <img src={icArrowExpense} alt=''/>
                                    </button>
            
                                    <button class="button-sort mx-2" onclick={() => sortIncome()}> 
                                        <img src={icArrowIncome} alt='' />
                                    </button>
                                </div>


                                <button class="filter-date-button" onClick={() => openCalendar()}>
                                    <p class="mt-2">Filter By Date</p>
                                </button>
                            </div>
                            
                        
                        { modalShow ? (
                            <>
                            <div class="form-popup d-md-none" id="myCalendar">
                                <form class="form-container">
                                    <div class="d-flex justify-content-center pt-4">
                                        <p class="filter-by-date-text">Filter by Date</p>
                                    </div>
                            
                                    <div>
                                    <div class="calendar-box mx-5">

                                        <DateRangePickerCalendar
                                        startDate={startDate}
                                        endDate={endDate}
                                        focus={focus}
                                        onStartDateChange={setStartDate}
                                        onEndDateChange={setEndDate}
                                        onFocusChange={handleFocusChange}
                                        locale={enGB}
                                        />
                                            
                                    </div>
                                    </div>

                                    
                                    <div>

                            
                            </div>
                                    <div class="d-flex justify-content-between mx-5">
                                        <div class="d-flex flex-column">
                                            <div>From</div>
                                            <div class="date-text"> {startDate ? (format(startDate, 'yyyy-MM-dd', { locale: enGB })) : (format(new Date(), 'yyyy-MM-dd', { locale: enGB })) }</div>
                                        </div>
                                        
                                        <div class="d-flex flex-column">
                                            <div>To</div>
                                            <div class="date-text"> {endDate ? format(endDate, 'yyyy-MM-dd', { locale: enGB }) : (format(new Date(), 'yyyy-MM-dd', { locale: enGB })) }</div>
                                        </div>
                                    </div>

                                <div class="d-flex justify-content-center mb-4 mt-4">
                                    <button type="button" class="calendar-apply" onclick={() => closeCalendar() }>Apply</button>
                                </div>
                                </form>
                            </div>
                        </>
                            ) : (
                                <p className='d-none'>ini false</p>
                            )
                        }



                                        
                        
                    </div>                                             
                <div className="d-none d-sm-block">
                <Footer/>
                </div>
            </>
         );
    }

 
export default History;