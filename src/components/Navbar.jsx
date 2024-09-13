import React, { useCallback, useEffect, useState } from 'react';

import { jwtDecode } from 'jwt-decode';

import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/slices/authSlice';

import { navMenus } from '../utils/data';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const Navbar = ({ menuIdx }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);
  const { name } = user || {};
  const googleClientId = process.env.REACT_APP_AUTH_CLIENT_ID;
  const [isAuthentication, setIsAuthentication] = useState(false);

  const handleLoginSuccess = useCallback(
    (credentialResponse) => {
      try {
        const decoded = jwtDecode(credentialResponse.credential); // 'credential'에서 JWT 토큰 추출
        dispatch(login({ authData: decoded }));
        setIsAuthentication(true);
        // console.log('Sign in success', credentialResponse);
      } catch (error) {
        console.error('Login success handling error', error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('authData'));
    if (storedData) {
      dispatch(login({ authData: storedData }));
      setIsAuthentication(true);
    }
  }, [dispatch]);

  const handleLoginError = (error) => {
    console.log('Google login error', error);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    setIsAuthentication(false);
  };

  return (
    <nav className="navi bg-[#212121] w-1/5 h-full rounded-sm border border-gray-500 py-10 px-4 flex flex-col justify-between items-center">
      <div className="logo-wrapper flex w-full items-center justify-center gap-8">
        <div className="logo"></div>
        <h2 className="font-semibold text-xl">
          <Link to="/" className="font-customFontEn">
            MARSHALL
          </Link>
        </h2>
      </div>
      <ul className="menus">
        {navMenus.map((menu, idx) => (
          <li
            key={idx}
            className={`${
              menu.idx === menuIdx ? 'bg-gray-950' : ''
            } rounded-sm mb-1 border border-gray-700 hover:bg-gray-950 transition-all duration-300`}
          >
            <Link to={menu.to} className="flex gap-x-4 items-center py-2 px-10">
              {menu.icon} {menu.label}
            </Link>
          </li>
        ))}
      </ul>
      {isAuthentication ? (
        <div className="w-4/5 flex flex-center">
          <button
            onClick={handleLogoutClick}
            className="font-customFontEn flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-3 px-4 rounded-md w-full"
          >
            <FcGoogle className="h-5 w-5" />
            <span className="text-sm">{name}님 Logout</span>
          </button>
        </div>
      ) : (
        <div className="w-4/5 flex flex-center login-btn">
          <GoogleOAuthProvider clientId={googleClientId}>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
            />
            <button className="font-customFontEn flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-3 px-4 rounded-md w-full">
              <FcGoogle className="h-5 w-5" />
              <span className="text-sm">Google Login</span>
            </button>
          </GoogleOAuthProvider>
          {/* <button onClick={() => handleGoogleLogin()}>Login with Google</button> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
