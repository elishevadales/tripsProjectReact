
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/general/header';
import Welcome from './components/general/welcome';
import Login from './components/general/login';
import SignUp from './components/general/signUp';
import Page404 from './components/general/404page';
import HeaderUser from './components/user/headerUser';
import HomeUser from './components/user/homeUser';
import HomeAdmin from './components/admin/homeAdmin';

import EventCard from './components/general/eventCard/eventCard'

// redux
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from 'react-redux';
import userInfoSlice from './components/reducer/userInfoSlice';
import UsersListAdmin from './components/admin/usersListAdmin';
import MyInfo from './components/general/myInfo';
import Posts from './components/general/posts';

import socketIO from 'socket.io-client'

import { API_URL } from './services/apiService'

const  socket = socketIO.connect(API_URL)
function App() {

  const myStore = configureStore({
    reducer: {
      userInfoSlice
    }
  })

  return (
    <BrowserRouter>
      <Provider store={myStore}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
          </Route>

          <Route path='/user' element={<HeaderUser
            links={[
              { title: 'פוסטים', path: '/user/events' },
              { title: 'עדכון-פרופיל', path: '/user/myInfo' },
            ]}
            color={"bg-warning"}
           />
          }>
            <Route path='/user/home' element={<HomeUser />} />
            <Route path='/user/myInfo' element={<MyInfo />} />
            <Route path='/user/events' element={<Posts />} />
            <Route path='/user/events/eventCard' element={<EventCard socket={socket} />} />
          </Route>

          <Route path='/admin' element={<HeaderUser
            links={[
              { title: 'פוסטים', path: '/admin/events' },
              { title: 'עדכון-פרופיל', path: '/admin/myInfo' },
              { title: 'משתמשים', path: '/admin/usersList' },
            ]}
            color={"bg-dark"}
           />}>
            <Route path='/admin/home' element={<HomeAdmin />} />
            <Route path='/admin/usersList' element={<UsersListAdmin />} />
            <Route path='/admin/events' element={<Posts />} />
            <Route path='/admin/myInfo' element={<MyInfo />} />
            <Route path='/admin/events/eventCard' element={<EventCard socket={socket} />} />

          </Route>
          <Route path="/*" element={<Page404 />} />

        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
