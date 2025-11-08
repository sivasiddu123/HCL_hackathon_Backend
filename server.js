const express = require('express');
const app = express();
const env = require('dotenv');
env.config();
const cors = require('cors');



app.use(cors({
   origin: []
}));

app.listen(process.env.PORT, () => {
    console.log('Server is listening at ' + process.env.IP_ADDRESS + ':%s', process.env.PORT);
});