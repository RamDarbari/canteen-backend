const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { describe, it, beforeEach, afterEach } = require('mocha');
const subMenuModel = require('./models/subMenuModel');
const menuModel = require('./models/menuModel');
const app = require('./app'); // Replace with the actual path to your Express app

chai.use(chaiHttp);
const expect = chai.expect;

describe('addSubMenu', () => {
  // Define a variable to track the connection status
  let isConnected;

  beforeEach(async () => {
    // Check if there's an existing connection
    if (!isConnected) {
      // If not, connect to the test database
      try {
        await mongoose.connect('mongodb+srv://uniyalshivani:shivani123@cluster0.zckqf6y.mongodb.net/canteen-backend', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        isConnected = true; // Set the connection status to true
      } catch (error) {
        console.error('Error during beforeEach:', error);
      }
    }
  });

  afterEach(async () => {
    // Check if there's an existing connection
    if (isConnected && mongoose.connection.readyState === 1) {
      try {
        // If connected, drop the test database
        await mongoose.connection.db.dropDatabase();
        // Disconnect from the database
        await mongoose.disconnect();
        isConnected = false; // Reset the connection status
      } catch (error) {
        console.error('Error during afterEach:', error);
      }
    }
  });

  it('should add a sub-menu when the title does not already exist and the menu id is valid', async () => {
    // Your test implementation remains unchanged
    // ...
  });

  it('should return an error when the title already exists', async () => {
    // Your test implementation remains unchanged
    // ...
  });

  // Additional test cases for different scenarios
  // ...
});
