
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/header';
import Welcome from './components/welcome';
import Login from './components/login';
import SignUp from './components/signUp';
import HeaderUser from './components/headerUser';
import HeaderAdmin from './components/headerAdmin';
import Page404 from './components/404page';


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

        </Route>

        <Route path='/admin' element={<HeaderAdmin />}>

        </Route>
        <Route path="/*" element={<Page404 />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
