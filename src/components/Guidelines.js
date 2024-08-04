import React,{ useState, useEffect }from"react";
import { BeatLoader } from 'react-spinners';
import { GUIDELINES_API_URL } from '../constants/apiList';
import { API_ERROR } from '../constants/messageList';

function Guidelines(props) {
  const[data, setData]=useState(null);
  const[loading, setLoading]=useState(true);
  const[error, setError]=useState(null); 

  async function getData() {
    await fetch(`${GUIDELINES_API_URL}${props.apiParms}`)
    .then((response)=>{
      if(response.ok){
        return response.json();
      }
      throw response;
    })
    .then(res => {
      setData(res);
    })
    .catch((error)=>{ 
       console.error("Error fetching data: ", error);
       setError(error);
    })
    .finally(()=>{
      setLoading(false);
    });
  }

  useEffect(()=>{
    getData();    
  });

  if(loading) { return <div className="inner-box"><BeatLoader color="#e80071" /></div>};
  if(error) return API_ERROR;

  return (
    <div className="inner-box">           
        {
          data.map((item => (
            <div 
            className="content" 
            key={item.SN} dangerouslySetInnerHTML={ {__html: item.Guidelines} } />
          )))
        }            
    </div>
  )
};

export default Guidelines;

