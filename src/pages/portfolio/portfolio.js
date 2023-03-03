import { Table } from 'react-bootstrap';


import 'pages/portfolio/portfolio.scss'
import { getData } from 'Utils/ApiHelper';
import { useEffect, useState } from 'react';

const Portfolio = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);


  const fetchData = async () => {
    let response = await getData({ api: 'api/user/portfolio' });
    setData(response);
    setIsLoading(false);
  };

  const contracts = (data) => {
    return data?.map((item, index) =>
      <>
        <a key={index} href={item?.link} target="_blank">{item?.name}</a><br />
      </>
    )
  }

  return (
   
            <div className='portfolio-section'>
              <div className='sub-heading'>
                <h3>Sinnvestment portfolio</h3>
              </div>
              <div className='portfolio-table'>
                {isLoading ? 
                <div className='p-5 text-center fw-bold'>
                  Loading...
                </div>
                :
                <Table responsive striped borderless className='align-middle mb-0'>
                  <thead>
                    <tr>
                      <th>Financing</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Contracts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item, index) =>
                      <tr key={index}>
                        <td><a href='#'>{item?.financing}</a></td>
                        <td>{item?.amount}</td>
                        <td>{item?.date}</td>
                        <td>{item?.status}</td>
                        <td>
                          {contracts(item?.contracts)}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                }
              </div>
            </div>
        
  )
}

export default Portfolio;