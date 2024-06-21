const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routers/authRouter');

const app = express();
app.use(bodyParser.json());

app.use('/membership', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});