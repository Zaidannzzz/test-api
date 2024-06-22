const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routers/authRouter');
const userRoutes = require('./routers/userRouter');
const informationRoutes = require('./routers/informationRouter');
const transactionRoutes = require('./routers/transactionRouter');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(authRoutes);
app.use(userRoutes);
app.use(informationRoutes);
app.use(transactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});