import axios from 'axios';

const URL = 'https://tinder-clone.onrender.com';

export const getOneUser = (userId) =>
  axios.get(`${URL}/user`, { params: { userId } });

export const getManyUsers = (userIds) =>
  axios.get(`${URL}/users`, { params: { userIds: JSON.stringify(userIds) } });

export const getGenderedUsers = (genderInterest) =>
  axios.get(`${URL}/gendered-users`, { params: { gender: genderInterest } });

export const getUsersWithoutMe = (userId) =>
  axios.get(`${URL}/everyone`, { params: { userId } });

export const getMessages = (id, correspondingId) =>
  axios.get(`${URL}/message`, { params: { userId: id, correspondingId } });

export const createAccount = (email, password) =>
  axios.post(`${URL}/signup`, { email, password });

export const logIn = (email, password) =>
  axios.post(`${URL}/login`, {
    email,
    password,
  });

export const addMessage = (data) => axios.put(`${URL}/message`, { data });

export const updateUser = (data) => axios.put(`${URL}/user`, { data });

export const updateMatches = (userId, matchedId) =>
  axios.put(`${URL}/addmatch`, {
    userId,
    matchedId,
  });
