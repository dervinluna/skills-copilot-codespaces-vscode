// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create app
const app = express();
// Use cors
app.use(cors());
// Use body-parser
app.use(bodyParser.json());

// Create comments object
const commentsByPostId = {};

// Create route to get comments
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create route to create comments
app.post('/posts/:id/comments', (req, res) => {
  // Generate random id
  const commentId = randomBytes(4).toString('hex');
  // Get comment from request body
  const { content } = req.body;
  // Get comments for post
  const comments = commentsByPostId[req.params.id] || [];
  // Push comment to comments array
  comments.push({ id: commentId, content });
  // Set comments array to post id
  commentsByPostId[req.params.id] = comments;
  // Send response with new comment
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});