import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet } from '../../services/apiService';

const UsersListAdmin = () => {

  const [ar,setAr] = useState([]);

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    let url = API_URL+"/users/usersList";
    try{
      let resp = await doApiGet(url);
      console.log(resp.data);
      setAr(resp.data.data);

    }
    catch(err){
      console.log(err);
      alert("there problem ,try again later")
    }

  }

  return (
    <div className=''>UsersListAdmin</div>
  )
}

export default UsersListAdmin