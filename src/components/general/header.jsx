import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Header = () => {
  const nav = useNavigate();
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const onClickLogo = () => {
    nav('/');
  };

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

  return (
    <>
      <header
        className='container-fluid m-0 pt-5'
        style={{
            boxShadow:"-4px 7px 13px -2px rgba(0,0,0,0.75)",
          background: '#ffffff24',
          position: visible ? 'fixed' : 'absolute',
          width: '100%',
          top: 0,
          transition: 'top 0.3s',
           height: '100px',
          zIndex: 1000, // Adjust the z-index value as needed
        }}
      >
        <div className='container  d-flex justify-content-between align-items-center'>
          <div className='logo d-flex' onClick={onClickLogo}>
            <i className='fa fa-car fa-2x' aria-hidden='true'></i>
            <h2 className='lead mr-3'>לוגו</h2>
          </div>
          <div className='nav d-flex align-items-center'>
            <Link to='/login' className='text-white text-decoration-none mx-3 lead'>
              כניסה
            </Link>
            <Link to='/signUp' className='text-white text-decoration-none mx-3 lead'>
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
