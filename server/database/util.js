require('dotenv').config();
const URI = process.env.URI;

const { MongoClient } = require('mongodb');
const client = new MongoClient(URI);

const checkUserExisting = async (email) => {
  try {
    await client.connect();
    const users = client.db('app-data').collection('users');

    const existingUser = await users.findOne({ email });

    return existingUser;
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

module.exports = {
  checkUserExisting,
};
