// require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
// const express = require('express') // CommonJS import style!
// const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
// const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
// const mongoose = require('mongoose')

// const app = express() // instantiate an Express object
// app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style
// app.use(cors()) // allow cross-origin resource sharing

// // use express's builtin body-parser middleware to parse any data included in a request
// app.use(express.json()) // decode JSON-formatted incoming POST data
// app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// // connect to database
// mongoose
//   .connect(`${process.env.DB_CONNECTION_STRING}`)
//   .then(data => console.log(`Connected to MongoDB`))
//   .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

// // load the dataabase models we want to deal with
// const { Message } = require('./models/Message')
// const { User } = require('./models/User')

// // a route to handle fetching all messages
// app.get('/messages', async (req, res) => {
//   // load all messages from database
//   try {
//     const messages = await Message.find({})
//     res.json({
//       messages: messages,
//       status: 'all good',
//     })
//   } catch (err) {
//     console.error(err)
//     res.status(400).json({
//       error: err,
//       status: 'failed to retrieve messages from the database',
//     })
//   }
// })

// // a route to handle fetching a single message by its id
// app.get('/messages/:messageId', async (req, res) => {
//   // load all messages from database
//   try {
//     const messages = await Message.find({ _id: req.params.messageId })
//     res.json({
//       messages: messages,
//       status: 'all good',
//     })
//   } catch (err) {
//     console.error(err)
//     res.status(400).json({
//       error: err,
//       status: 'failed to retrieve messages from the database',
//     })
//   }
// })
// // a route to handle logging out users
// app.post('/messages/save', async (req, res) => {
//   // try to save the message to the database
//   try {
//     const message = await Message.create({
//       name: req.body.name,
//       message: req.body.message,
//     })
//     return res.json({
//       message: message, // return the message we just saved
//       status: 'all good',
//     })
//   } catch (err) {
//     console.error(err)
//     return res.status(400).json({
//       error: err,
//       status: 'failed to save the message to the database',
//     })
//   }
// })

// // app.get('/about', (req, res) => {
// //   const aboutData = {
// //     text: "Hi, my name is Ashley Liu, a junior majoring in Computer Science at NYU. I am originally from Beijing, China, and I love doing all kinds of sports and travelling with my friends.",
// //     imageUrl: "https://example.com/my-photo.jpg" 
// //   };

// //   res.json(aboutData);
// // });

// app.get('/about', (req, res) => {
//   try {
//     const aboutData = {
//       intro: "Hi, my name is Ashley Liu, a junior majoring in Computer Science at NYU. I am originally from Beijing, China, and I love doing all kinds of sports and travelling with my friends.",
//       imageUrl: "https://example.com/my-photo.jpg" 
//     };
//     res.json(aboutData);
//   } catch (err) {
//     console.error('Error sending about data:', err);
//     res.status(500).json({
//       error: 'Failed to send about data',
//       status: 'error'
//     });
//   }
// });


// // export the express app we created to make it available to other modules
// module.exports = app // CommonJS export style!

require('dotenv').config({ silent: true }); // Load environment variables from .env
const express = require('express'); // CommonJS import style
const morgan = require('morgan'); // Middleware for logging HTTP requests
const cors = require('cors'); // Middleware for enabling CORS
const mongoose = require('mongoose'); // For MongoDB connection

const app = express(); // Instantiate an Express object

// Middleware Setup
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })); // Skip logging in test mode
app.use(cors()); // Allow cross-origin resource sharing
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Connect to the MongoDB database
mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`));

// Load the database models
const { Message } = require('./models/Message');
const { User } = require('./models/User');

// Fetch all messages
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find({});
    res.json({ messages, status: 'all good' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err, status: 'failed to retrieve messages' });
  }
});

// Fetch a single message by its ID
app.get('/messages/:messageId', async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);
    res.json({ message, status: 'all good' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err, status: 'failed to retrieve the message' });
  }
});

// Save a new message
app.post('/messages/save', async (req, res) => {
  try {
    const message = await Message.create({
      name: req.body.name,
      message: req.body.message,
    });
    return res.json({ message, status: 'all good' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err, status: 'failed to save the message' });
  }
});

// About Us route to send intro and image URL
app.get('/about', (req, res) => {
  try {
    const aboutData = {
      text: "Hi, my name is Ashley Liu, a junior majoring in Computer Science at NYU. I am originally from Beijing, China, and I love doing all kinds of sports and travelling with my friends."
    };
    res.json(aboutData); // Send the about data as JSON
  } catch (err) {
    console.error('Error sending about data:', err);
    res.status(500).json({ error: 'Failed to send about data', status: 'error' });
  }
});

// Export the Express app
module.exports = app;

