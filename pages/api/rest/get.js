import axios from "axios"
import Base from "../../../constants/baseUrl";

export default function handler(req, res) {

    const finalUrl = `${Base.BASE_URL}${req.query.originalUrl}`;

    const queryData = req.query 
    delete queryData.originalUrl

    const query = new URLSearchParams(queryData).toString();

    let requestHeader = {
      'Accept': 'application/json', 
      'Content-Type': 'application/json'
    };
    
    if(req.headers.cookie){
      requestHeader = {...requestHeader, 'Cookie': req.headers.cookie};
    }

    var config = {
      method: req.method,
      url: `${finalUrl}${query? '?'+ query : ''}`,
      headers: requestHeader,
      data: JSON.stringify(req.body ? req.body : {})
    };
    


    axios(config)
    .then(function (result) {
        res.status(result.status).json(result.data);


    })
    .catch(function (error) {
        
      const status = error.response &&  error.response.status ? error.response.status : 500;
      
      let data = error.response && error.response.data ? error.response.data : {};
        
      res.status(status).json(data);

    });


}
  