import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { setAvatarRoute } from '../utils/APIRoutes';
import loader from '../assets/loader.gif';
import { Buffer } from 'buffer';
const SetAvatar = () => {
  const api = 'https://api.multiavatar.com/45678945';
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const setProfilePicture = async () => {};

  useEffect(async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.floor(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString('base64'));
    }
    setAvatars(data);
    setIsLoading(false);
  }, []);
  return (
    <>
      <Container>
        <div className='title-container'>
          <h1>Pic an avatar for your profile picture</h1>
          <div className='avatars'>
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? 'selected' : ''
                  }`}>
                  <img
                    src={`data:image/svg+xml;base64, ${avatar}`}
                    alt='avatar'
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};
const Container = styled.div``;
export default SetAvatar;
