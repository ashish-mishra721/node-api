const FilterData = (props) => {
 
  return(    
  <td>
    {(props.session  && ( (props.filterType === 'age')? props.filter === props.session.min_age_limit: props.filter === props.session.vaccine)) ?
      props.session.available_capacity === 0 ?      //session true condition        
        <div>
          {/*  true session.available_capacity */}
          <small className="badge badge-danger">Booked ashish</small>
          <small>{props.session.vaccine}</small><br />
          <small className="text-danger">{"Age" + props.session.min_age_limit + "+"}</small>
        </div>
        :
        <div>
          {/*  false session.available_capacity */}
          <span className="badge badge-success">{props.session.available_capacity}</span><br />
          <small>{props.session.vaccine}</small><br />
          <small className="text-danger">Age {props.session.min_age_limit + "+"}</small>
        </div>
      :
      <small className="badge badge-light">NA</small>   //session false condition
    }
  </td>
   
  )
}

export default FilterData;
