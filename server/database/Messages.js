require('dotenv').config();
const URI = process.env.URI;

const { MongoClient } = require('mongodb');
const client = new MongoClient(URI);

const getMessages = async (userId, correspondingUserId) => {
  try {
    await client.connect();
    const messages = await client.db('app-data').collection('messages');
    const query = {
      from_userId: userId,
      to_userId: correspondingUserId,
    };

    const foundMessages = await messages.find(query).toArray();

    return foundMessages;
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

const addMessage = async (message) => {
  try {
    await client.connect();
    const messages = client.db('app-data').collection('messages');
    const insertedMessage = await messages.insertOne(message);
    return insertedMessage;
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

module.exports = { getMessages, addMessage };
