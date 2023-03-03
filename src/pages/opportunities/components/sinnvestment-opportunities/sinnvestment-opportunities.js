import React, { useEffect, useState } from "react";
import "pages/opportunities/components/sinnvestment-opportunities/sinnvestment-opportunities.scss";
import { getData } from 'Utils/ApiHelper';
import OpportunityItem from "pages/opportunities/components/opportunity-item";
import { Row} from "react-bootstrap";


const SinnvestmentOpportunities = ({stateChanger}) => {
  const [diligence, setDiligence] = useState(false);
  const [contact, setContact] = useState(false);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);


  const fetchData = async () => {
    let response = await getData({ api: 'api/user/investment_opportunities' });
    console.log(response);
    setData(response);
    setIsLoading(false);
    if(response.length === 0){
      setNoData(true)
    }
  };
console.log(noData);
  return (
    <React.Fragment>
      {isLoading ?
        <div className='p-5 text-center fw-bold'>
          Loading...
        </div>
        :
        <React.Fragment>
        <div className="mb-5">
        
        <Row className="gx-5">
          {data?.map((item) =>
          <OpportunityItem {...item} key={item.id} stateChanger={stateChanger} />
          )}
           </Row>
      </div>
        </React.Fragment>
      }
      {noData === true ? (<div className="text-center p-5">No result found</div>) : ""}
    </React.Fragment>
  )
}
export default SinnvestmentOpportunities;