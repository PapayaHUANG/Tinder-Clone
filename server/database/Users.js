require('dotenv').config();
const URI = process.env.URI;

const { MongoClient } = require('mongodb');
const client = new MongoClient(URI);

const jwt = require('jsonwebtoken');

const getOneUser = async (userId) => {
  try {
    await client.connect();
    const users = await client.db('app-data').collection('users');
    const query = { user_id: userId };

    const user = await users.findOne(query);
    return user;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

const getManyUsers = async (userIds) => {
  try {
    await client.connect();
    const users = await client.db('app-data').collection('users');
    const pipeline = [
      {
        $match: {
          user_id: {
            $in: userIds,
          },
        },
      },
    ];

    const foundUsers = await users.aggregate(pipeline).toArray();
    return foundUsers;
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

const getUsersByGender = async (gender) => {
  try {
    await client.connect();
    const users = await client.db('app-data').collection('users');

    const query = { gender_identity: { $eq: gender } };

    const foundUsers = await users.find(query).toArray();

    return foundUsers;
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

const getEveryUserWithoutMe = async (id) => {
  try {
    await client.connect();
    const users = await client.db('app-data').collection('users');
    const query = { _id: { $ne: id } };
    const foundUsers = await users.find(query).toArray();
    return foundUsers;
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};
const createAccount = async (newUser) => {
  try {
    await client.connect();
    const users = await client.db('app-data').collection('users');
    const insertedUser = await users.insertOne(newUser);
    const token = jwt.sign(insertedUser, process.env.JWT_KEY, {
      expiresIn: 60 * 24,
    });
    return { token, userId: newUser.user_id };
  } catch (error) {
    console.error(error);
  }
};

const logIn = (user) => {
  const token = jwt.sign(user, process.env.JWT_KEY, {
    expiresIn: 60 * 24,
  });
  return token;
};

const updateUser = async (id, user) => {
  try {
    await client.connect();
    const users = await client.db('app-data').collection('users');
    const query = { user_id: id };
    console.log(query);
    const insertedUser = await users.updateOne(query, { $set: user });
    return insertedUser;
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

const addMatch = async (userId, updatedDocument) => {
  try {
    await client.connect();
    const users = await client.db('app-data').collection('users');
    const query = { user_id: userId };
    const user = await users.updateOne(query, { $push: updatedDocument });
    return user;
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

module.exports = {
  getManyUsers,
  getOneUser,
  getEveryUserWithoutMe,
  getUsersByGender,
  createAccount,
  logIn,
  updateUser,
  addMatch,
};
