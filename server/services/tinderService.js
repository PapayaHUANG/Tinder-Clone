const User = require('../database/Users');
const Message = require('../database/Messages');

const { v4: uuidv4 } = require('uuid');

const getOneUser = async (userId) => {
  const user = await User.getOneUser(userId);
  return user;
};

const getManyUsers = async (userIds) => {
  const users = await User.getManyUsers(userIds);
  return users;
};

const getUsersByGender = async (gender) => {
  const users = await User.getUsersByGender(gender);
  return users;
};

const getMessages = async (userId, correspondingUserId) => {
  const messages = await Message.getMessages(userId, correspondingUserId);
  return messages;
};

const createAccount = async (newUser) => {
  const userToInsert = {
    ...newUser,
    user_id: uuidv4(),
  };

  const createdUser = await User.createAccount(userToInsert);

  return createdUser;
};

const logIn = async (user, email) => {
  const token = await User.logIn(user, email);
  return token;
};

const addMessage = async (message) => {
  const newMessage = await Message.addMessage(message);
  return newMessage;
};

const updateUser = async (formData) => {
  const id = formData.user_id;
  const userDetail = {
    first_name: formData.first_name,
    dob_day: formData.dob_day,
    dob_month: formData.dob_month,
    dob_year: formData.dob_year,
    show_gender: formData.show_gender,
    gender_identity: formData.gender_identity,
    gender_interest: formData.gender_interest,
    url: formData.url,
    about: formData.about,
    matches: formData.matches,
  };
  const updatedUser = await User.updateUser(id, userDetail);
  return updatedUser;
};

const updateMatches = async (userId, matchedUserId) => {
  const updatedDocument = { matches: { user_id: matchedUserId } };
  const result = await User.addMatch(userId, updatedDocument);
  return result;
};

module.exports = {
  getOneUser,
  getManyUsers,

  getUsersByGender,
  getMessages,
  createAccount,
  logIn,
  addMessage,
  updateUser,
  updateMatches,
};
