import React from 'react'
import { useLocation } from 'react-router'

const UserCard = (props) => {
const location = useLocation();
const { state } = location;

  return (
    <div>
        <p>{state.userId.email}</p>
        <p>{state.userId.nick_name}</p>
    </div>
  )
}

export default UserCard