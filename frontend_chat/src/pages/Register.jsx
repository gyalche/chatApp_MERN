import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logoDawa.png';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

const Register = () => {
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
      const { password, username, email } = registerData;

      const { data } = await axios.post(registerRoute, {
        username,
        password,
        email,
      });
      if (data.status === false) {
        toast.error(data.msg);
      }
      if (data.status === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate('/');
      }
    }
  };

  const handleValidation = () => {
    const { password, confirmpassword, username, email } = registerData;
    if (password !== confirmpassword) {
      toast.error('passowrd and confirm password should be shame', {
        position: 'bottom-center',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
      return false;
    } else if (username.length < 3) {
      toast.error('username should be greater than 3 characters', {
        position: 'bottom-center',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
      return false;
    } else if (password.length < 8) {
      toast.error('password should be at least 8 characters', {
        position: 'bottom-center',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
      return false;
    } else if (email === '') {
      toast.error('email is required', {
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
  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/');
    }
  }, []);
  return (
    <>
      <FormConatiner>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='brand'>
            <img src={logo} alt='logo' />
            <h1>ChatBox</h1>
          </div>
          <input
            type='text'
            placeholder='Username'
            name='username'
            onChange={handleChange}
            value={registerData.username}
          />

          <input
            type='email'
            placeholder='email'
            name='email'
            onChange={handleChange}
            value={registerData.email}
          />

          <input
            type='password'
            placeholder='password'
            name='password'
            onChange={handleChange}
            value={registerData.password}
          />

          <input
            type='password'
            placeholder='conform password'
            name='confirmpassword'
            onChange={handleChange}
            value={registerData.confirmpassword}
          />

          <button type='submit'>Create User</button>
          <span>
            Already have an account?<Link to='/login'>Login</Link>
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
export default Register;
