import React from 'react'
import { API_URL, doApiMethod } from '../../services/apiService';

const UserItem = (props) => {
    let item = props.item;
    let date = item.date_created.slice(8, 10) + "/" + item.date_created.slice(5, 7) + "/" + item.date_created.slice(0, 4);


    const onRoleClick = async () => {
        let bodyData;
        if (item.role == "user") {
            bodyData = { role: "admin" }
        }
        else {
            bodyData = { role: "user" }
        }

        let url = API_URL + "/users/changeRole/" + item._id;
        try {
            let resp = await doApiMethod(url, "PATCH", bodyData)
            console.log(resp.data)
            if (resp.data) {
                props.doApi()
            }
        }
        catch (err) {
            console.log(err.response);
            alert("There problem, or you try to change superAdmin to user");
        }
    }

    const onActiveClick = async () => {
        let bodyData;
        if (item.active == true) {
            bodyData = { active: false }
        }
        else {
            bodyData = { active: true }
        }

        let url = API_URL + "/users/changeActive/" + item._id;
        try {
            let resp = await doApiMethod(url, "PATCH", bodyData)
            console.log(resp.data)
            if (resp.data) {
                props.doApi()
            }
        }
        catch (err) {
            console.log(err.response);
            alert("There problem, or you try to change superAdmin to false");
        }
    }


    const onXClick = async() => {
        try {
            let url = API_URL + "/users/" + item._id;
            let resp = await doApiMethod(url, "DELETE");
            console.log(resp.data);
            if (resp.data.deletedCount == 1) {
                props.doApi()
            }
        }
        catch (err) {
            console.log(err.response);
            alert(err.response.data.msg || "there is problem");
        }
}

  return (
           <tr>

            <td>{props.index + 1}</td>
            <td>{item.name}</td>
            <td>{item._id}</td>
            <td>{item.email}</td>
            <td>{date}</td>
            <td>
                {
                    item.role == 'admin' ?
                        <button className='btn' style={{ background: "rgb(170, 249, 255)", color: "black", border: "1px solid black" }} onClick={onRoleClick}>
                            {item.role}
                        </button>
                        :
                        <button className='btn' style={{ background: "white", color: "black", border: "1px solid black" }} onClick={onRoleClick}>
                            {item.role}
                        </button>
                }

            </td>
            <td>
                {item.active ?
                    <button className='btn' style={{ background: "green", color: "white" }} onClick={onActiveClick}>
                        active
                    </button>
                    :
                    <button className='btn' style={{ background: "red", color: "white" }} onClick={onActiveClick}>
                        blocked
                    </button>
                }
            </td>
            <td>
                <button className='btn btn-danger' onClick={onXClick}>X</button>

            </td>
        </tr>
  )
}

export default UserItem