const tinderService = require('../services/tinderService');
const util = require('../database/util');
const bcrypt = require('bcrypt');

const getOneUser = async (req, res) => {
  const userId = req.query.userId;
  const user = await tinderService.getOneUser(userId);
  res.send(user);
};

const getManyUsers = async (req, res) => {
  const userIds = JSON.parse(req.query.userIds);
  const users = await tinderService.getManyUsers(userIds);
  res.send(users);
};

const getUsersByGender = async (req, res) => {
  const gender = req.query.gender;
  const usersByGender = await tinderService.getUsersByGender(gender);
  res.send(usersByGender);
};

const getEveryUserWithoutMe = async (req, res) => {
  const id = req.query.userId;
  const everyUser = await tinderService.getEveryUserWithoutMe(id);
  res.send(everyUser);
};

const getMessages = async (req, res) => {
  const { userId, correspondingUserId } = req.query;
  const messages = await tinderService.getMessages(userId, correspondingUserId);
  res.send(messages);
};

const createAccount = async (req, res) => {
  const { email, password } = req.body;
  const isUserExisted = await util.checkUserExisting(email);

  if (isUserExisted) {
    res.status(409).send('User already existed!');
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sanitizedEmail = email.toLowerCase();

    const newUser = { email: sanitizedEmail, hashed_password: hashedPassword };
    const createAccount = await tinderService.createAccount(newUser);

    res.status(201).send(createAccount);
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await util.checkUserExisting(email);

  const correctPassword = await bcrypt.compare(password, user.hashed_password);
  if (user && correctPassword) {
    const token = tinderService.logIn(user, email);
    res.status(201).send({ token, userId: user.user_id });
  } else {
    res.status(400).send('Invalid Credentials');
  }
};

const addMessage = async (req, res) => {
  const message = req.body.message;
  const newMessage = await tinderService.addMessage(message);
  res.send(newMessage);
};

const updateUser = async (req, res) => {
  const formData = req.body.data;
  console.log(formData);
  const updateUser = await tinderService.updateUser(formData);
  res.send(updateUser);
};

const updateMatches = async (req, res) => {
  const { userId, matchedUserId } = req.body;
  const updateMatches = await tinderService.updateMatches(
    userId,
    matchedUserId
  );
  res.send(updateMatches);
};

module.exports = {
  getOneUser,
  getManyUsers,

  getUsersByGender,
  getEveryUserWithoutMe,
  getMessages,
  createAccount,
  logIn,
  addMessage,
  updateUser,
  updateMatches,
};
