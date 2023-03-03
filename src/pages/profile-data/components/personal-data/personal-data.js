import { Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import React, { useEffect, useState } from "react";
import PrivatePerson from "pages/profile-data/components/personal-data/privateperson";
import Business from "pages/profile-data/components/personal-data/business";
import { postData,getData } from 'Utils/ApiHelper';


const PersonalData = () => {

 const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
  setIsLoading(true);
  fetchData();
  }, []);



  const fetchData = async () => {
    let response = await getData({ api: 'api/user/details' });

    setData(response);
  
     
     setIsLoading(false);
  };

  const [accountType, setAccountType] = useState("privateperson")

  const options = [
    {
      label: "Business",
      value: "business",
    },
    {
      label: "Private person",
      value: "privateperson",
    }
  ];


  const handler = (value) => {
    setAccountType(value.value);
  }
console.log(data)
  return (
    <React.Fragment>
      <Row>
        <Col lg={3}>
          <Form.Group className="mb-5">
            <Form.Label>Manage account as</Form.Label>
            <Select
              className="custom-select"
              classNamePrefix="select"
              defaultValue={options[1]}
              isSearchable={false}
              name="accountType"
              options={options}
              onChange={handler}
            />
          </Form.Group>
        </Col>
      </Row>
      {accountType === "privateperson" &&
        <PrivatePerson data={data} />
      }
      {accountType === "business" &&
        <Business data={data}/>
      }
    </React.Fragment>
  )
}

export default PersonalData;