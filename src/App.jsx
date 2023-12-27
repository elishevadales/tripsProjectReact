
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/general/header';
import Welcome from './components/general/welcome';
import Login from './components/general/login';
import SignUp from './components/general/signUp';
import HeaderAdmin from './components/admin/headerAdmin';
import Page404 from './components/general/404page';
import HeaderUser from './components/user/headerUser';
import HomeUser from './components/user/homeUser';
import HomeAdmin from './components/admin/homeAdmin';


function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Header />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Route>

        <Route path='/user' element={<HeaderUser />}>
          <Route path='/user/home' element={<HomeUser />} />
        </Route>

        <Route path='/admin' element={<HeaderAdmin />}>
          <Route path='/admin/home' element={<HomeAdmin />} />

        </Route>
        <Route path="/*" element={<Page404 />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
