import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet } from '../../services/apiService';
import UserItem from './userItem';



const UsersListAdmin = () => {

  const [ar, setAr] = useState([]);



  useEffect(() => {
    doApi();
    console.log(ar)
  }, [])


  const doApi = async () => {
    let url = API_URL + "/users/usersList";
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      setAr(resp.data);

    }
    catch (err) {
      console.log(err);
      alert("יש בעיה בשליפת הנתונים. נסה שוב מאוחר יותר")
    }

  }



  return (
    <div style={{ backdropFilter: "blur(20px)",minHeight:"100vh" }}>



      <div className='container'>
        <h1 className='display-4' style={{ textAlign: "center" }}>רשימת המשתמשים במערכת</h1>
        <div className="table-responsive">
          <table className='table table-striped table-hover'>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>_Id</th>
                <th>Email</th>
                <th>Date-created</th>
                <th>Role</th>
                <th>Active</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {ar.map((item, i) => {
                return (
                  <UserItem key={item._id} doApi={doApi} index={i} item={item} />
                )
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default UsersListAdmin