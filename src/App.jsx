
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
import MyInfo from './components/general/myInfo/myInfo';
import Posts from './components/general/posts';
import Profile from './components/general/profile/profile';
import socketIO from 'socket.io-client'

import { API_URL } from './services/apiService'
import NewEvent from './components/general/addEvent/newEvent';
import UserCard from './components/general/userCard';
import EventsMap from './components/general/eventsMap';

const socket = socketIO.connect(API_URL)
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

          <Route path='/user' element={<HeaderUser socket={socket}
            links={[
              { title: 'אירועים', path: '/user/events' },
              { title: 'פרופיל', path: '/user/myProfile' },
              { title: 'אירוע-חדש', path: '/user/newEvent' },
              { title: 'מפת-אירועים', path: '/user/eventsMap' },
            ]}
            color={"bg-warning"}
          />
          }>
            <Route path='/user/home' element={<HomeUser />} />
            <Route path='/user/myProfile' element={<Profile myProfile={true} />} />
            <Route path='/user/events' element={<Posts />} />
            <Route path='/user/myInfo' element={<MyInfo />} />
            <Route path='/user/events/eventCard' element={<EventCard socket={socket} />} />
            <Route path='/user/newEvent' element={<NewEvent />} />
            <Route path='/user/userInfo' element={<Profile myProfile={true} />} />
            <Route path='/user/profile' element={<Profile />} />
            <Route path='/user/eventsMap' element={<EventsMap/>} />

          </Route>

          <Route path='/admin' element={<HeaderUser socket={socket}
            links={[
              { title: 'פוסטים', path: '/admin/events' },
              { title: ' פרופיל', path: '/admin/myProfile' },
              { title: 'משתמשים', path: '/admin/usersList' },
              { title: 'אירוע-חדש', path: '/admin/newEvent' },
              { title: 'מפת-אירועים', path: '/admin/eventsMap' }

            ]}
            color={"bg-dark"}
          />}>
            <Route path='/admin/home' element={<HomeAdmin />} />
            <Route path='/admin/usersList' element={<UsersListAdmin />} />
            <Route path='/admin/events' element={<Posts />} />
            <Route path='/admin/myInfo' element={<MyInfo />} />
            <Route path='/admin/myProfile' element={<Profile myProfile={true} />} />
            <Route path='/admin/events/eventCard' element={<EventCard socket={socket} />} />
            <Route path='/admin/newEvent' element={<NewEvent />} />
            <Route path='/admin/myProfile' element={<Profile myProfile={true} />} />
            <Route path='/admin/profile' element={<Profile />} />
            <Route path='/admin/eventsMap' element={<EventsMap/>} />



          </Route>
          <Route path="/*" element={<Page404 />} />

        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
