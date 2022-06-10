// Import required
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
import express from 'express';
import cors from 'cors';
import users from './api/users.route.js';

// Create express server
const app = express();

// Cors middleware / parse json
app.use(cors());
app.use(express.json());

// Import route files
app.use('/users', users);
app.use('*', (req, res) => res.status(404).json({ error: 'not found'}));

export default app;