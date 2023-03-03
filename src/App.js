import Router from 'routes/router';
import { Link, useNavigate, useParams  } from "react-router-dom";
import { postData,getData } from 'Utils/ApiHelper';

const App = () => {
    const navigate = useNavigate();

     const queryParameters = new URLSearchParams(window.location.search)
     const token = queryParameters.get("token");
     console.log(token);
     if((token == undefined  || token == null) && ! localStorage.getItem('token') ){
        localStorage.setItem('isLoggedIn', false);
       
            // return ("Invalid token");
     }else if(token !=undefined && token != null){ 
        localStorage.setItem('token', token);
        localStorage.setItem('isLoggedIn', true);
       
 
     }
  return (
    <Router/>
  );
}

export default App;
