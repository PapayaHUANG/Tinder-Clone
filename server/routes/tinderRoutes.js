const express = require('express');
const router = express.Router();
const tinderController = require('../controllers/tinderController');

router.get('/', (req, res) => {
  res.json('hello tinder!');
});

router.get('/user', tinderController.getOneUser);

router.get('/users', tinderController.getManyUsers);

router.get('/gendered-users', tinderController.getUsersByGender);

router.get('/everyone', tinderController.getEveryUserWithoutMe);

router.get('/messages', tinderController.getMessages);

router.post('/signup', tinderController.createAccount);

router.post('/login', tinderController.logIn);

router.post('/message', tinderController.addMessage);

router.put('/user', tinderController.updateUser);

router.put('/addmatch', tinderController.updateMatches);

module.exports = router;
