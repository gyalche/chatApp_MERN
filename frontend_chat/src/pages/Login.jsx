import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logoDawa.png';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';

const Login = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const handleChange = (e) => {
    e.stopPropagation();
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, username } = registerData;

      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg);
      }
      if (data.status === true) {
        // localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate('/');
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/');
    }
  }, []);

  const handleValidation = () => {
    const { password, username } = registerData;
    if (username.length === '') {
      toast.error('email and password is required', {
        position: 'bottom-center',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
      return false;
    } else if (password === '') {
      toast.error('email and password is required', {
        position: 'bottom-center',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
      return false;
    }
    return true;
  };
  return (
    <>
      <FormConatiner>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='brand'>
            <img src={logo} alt='logo' />
            <h1>LOGIN</h1>
          </div>
          <input
            type='text'
            placeholder='Username'
            name='username'
            onChange={handleChange}
            value={registerData.username}
          />

          <input
            type='password'
            placeholder='password'
            name='password'
            onChange={handleChange}
            value={registerData.password}
          />
          <button type='submit'>LOGIN</button>
          <span>
            Dont have an account??<Link to='/register'>regsiter</Link>
          </span>
        </form>
      </FormConatiner>
      <ToastContainer />
    </>
  );
};
const FormConatiner = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }

    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;

    input {
      background-color: transparent;
      padding: 1rem;
      outline: none;
      border: 0.1rem solid gray;
      border-radius: 0.4rem;

      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      font-weight: bold;
      border: none;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      text-align: center;

      a {
        color: #4e0eff;
        text-transform: none;
        font-weight: bold;
      }
    }
  }
`;
export default Login;
