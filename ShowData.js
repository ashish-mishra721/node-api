import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Table, Tag, Divider, Select, Row } from 'antd';
import FilterData from './FilterData';
import 'antd/dist/antd.css';

function ShowData(props) {

    let today //today date and time
    let date //current date
    today = moment()
    console.log(props.district)

    const [Slots, setSlots] = useState([]) //centers details
    
    const [Dates, setDates] = useState([]) // array date details
   
		const [filter, setFilter]  =useState();

		const [filterType, setfilterType] = useState();
   

    const showData = async() => {

        try{
    
            date = today.format('DD-MM-YYYY')
            console.log(date) //date in api required format
                                //props.id is district id and date is current date
            const response = await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${props.district}&date=${date}`)
            setSlots([...response.data.centers])
        }
        catch(e)
        {
            console.log("Error : ",e)
        }

    }

    const getDates = () => {
        let days = []
        days[0]= today.format("DD MMMM")
        for(let i=1;i<6;i++)
        {
            days[i] = today.add(1,'days').format("DD MMMM") // increasig one by one
            // today=today.subtract(i,'days')
        }
        
        setDates(days)
    
    }

    useEffect(() => {
        showData()
        getDates()

    }, [])

    const isPresent=(date,sessions)=>{
			console.log("aaaaaaa",sessions)
       // console.log(date)
       // console.log(sessions)
       // console.log( moment(sessions[0].date,"DD-MM-YYYY").format("DD MMMM"));
       const session= sessions.find(session=> moment(session.date,"DD-MM-YYYY").format('DD MMMM')===date); //check session date present or not and convert into dd-mm-yyyy "date": "02-06-2021"
     //  console.log(session);
       return session;
    }

		// filter
	const getfilterData = (type, data) => {
		// console.log("ashish", Slots);
		setFilter(data);
		setfilterType(type);
		// let data = Slots.map((element) => {
		// 	return {...element, sessions: element.sessions.filter((subElement) => subElement.min_age_limit === 18)}
		// })
		// //setSlots([data])
		// console.log(data)
		
	}
	// 	let output = fruitData.filter(eachVal => {
	// 		let opt = eachVal.details.some((
	// 				{ gradingDetails }) => gradingDetails
	// 				.some(({ grade }) => grade === 'A'));
	// 		return opt;
	// })

    return (
        <div>
            <br/>
            
						<button  class="btn btn-primary" onClick = {()=>getfilterData('age',18)}>18</button>
						<button  class="btn btn-primary" onClick = {()=>getfilterData('age',45)}>45</button>
						<button  class="btn btn-primary" onClick = {()=>getfilterData('vaccine','COVISHIELD')}>COVISHIELD</button>
						<button  class="btn btn-primary" onClick = {()=>getfilterData('vaccine','COVAXIN')}>Covaxin</button>
           <h3 className = "mb-4 text-center">Slots</h3>
           <table className="table table-hover">
            <thead>
                <tr>
                    <th></th>
                    {
                        Dates.map((s,i) =>(
                        <th key={i} scope="col" style={{color: "black"}}>{Dates[i]}</th>
                        )) 
                    }
                </tr>
            </thead>
            <tbody>
            {
                //centers
                Slots.map((s,index) => (
                    <tr key={index}>
                        <td scope="row" style={{color:"#002060"}}>{s.name + " "} 
                            <small className="badge badge-primary">{s.fee_type == "Paid" ? s.fee_type : null}</small><br/>
                            <p style={{color : "#998fa2"}}>{s.address}</p>
                            <span style={{color : "#6c757d"}}>{s.vaccine_fees ? `${s.vaccine_fees[0].vaccine} : Rs. ${s.vaccine_fees[0].fee}` : null}</span>
                        </td>    
                        {
                            //sessions
                           
                            Dates.map(s1 =>{
                                const session=isPresent(s1,s.sessions); //current center booked or not
                                return(
																	(!filter) ?
                                    <td>
                                      {session ?
                                        session.available_capacity == 0 ?      //session true condition        

                                        <div>
                                        {/*  true session.available_capacity */}
                                            <small className="badge badge-danger">Booked</small>                            
                                            <small>{session.vaccine}</small><br/>
                                            <small className="text-danger">{"Age" + session.min_age_limit + "+"}</small>
                                        </div>
                                        : 
                                        <div>
                                          {/*  false session.available_capacity */}
                                            <span className="badge badge-success">{session.available_capacity}</span><br/>
                                            <small>{session.vaccine}</small><br/>
                                            <small className="text-danger">Age {session.min_age_limit + "+"}</small>
                                        </div>
                                        : 
                                        <small className="badge badge-light">NA</small>   //session false condition
                                      }
                                    </td>: <FilterData session = {session} filter = {filter} filterType = {filterType}/>
                                )    
                            })   
														        
                        }
                    </tr>
                    ))
            }
            </tbody>
            </table>

        </div>
    )
}

export default ShowData
