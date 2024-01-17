import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Logo from './logo';

const Header = () => {
  const nav = useNavigate();
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);



  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const onClickLogo = () => {
    nav('/');
  };

  return (
    <>
      <header
        className='container-fluid m-0 p-0 d-flex align-items-center'
        style={{
          boxShadow: "-4px 7px 13px -2px rgba(0,0,0,0.75)",
          // background: 'rgba(35, 140, 156, 0.66)',
          background: "rgba(255, 255, 255, 0.7)",
          position: visible ? 'fixed' : 'absolute',
          width: '100%',
          top: 0,
          transition: 'top 0.3s',
          height: '100px',
          zIndex: 1000,
        }}
      >
        <div className='container d-flex justify-content-between align-items-center'>
          <div onClick={onClickLogo}>
            <Logo />

          </div>
          <div style={{ color: "rgb(35, 140, 156)" }} className='nav d-flex align-items-center d-none d-sm-block'>
            <Link to='/login' className=' text-decoration-none mx-3 h5' style={{ color: "rgb(35, 140, 156)" }}>
              כניסה
            </Link>
            <Link to='/signUp' className='text-decoration-none mx-3 h5' style={{ color: "rgb(35, 140, 156)" }}>
              רישום
            </Link>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
