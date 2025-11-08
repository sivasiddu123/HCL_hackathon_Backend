const express = require('express');
const app = express();
const env = require('dotenv');
env.config();
const cors = require('cors');
const connectDb = require('./Models/db-connection')

app.use(express.json());

app.use(cors({
   origin: []
}));

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

app.use('/api/auth', require('./routes/authRoutes'));

// app.listen(process.env.PORT, () => {
//     console.log('Server is listening at ' + process.env.IP_ADDRESS + ':%s', process.env.PORT);
// });
connectDb().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("server is running at port:" , process.env.PORT);
    });
    
})