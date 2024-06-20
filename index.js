const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./routers/authRouter');
const userRoutes = require('./routers/userRouter');
const transactionRoutes = require('./routers/transactionRouter');
const informationRoutes = require('./routers/informationRouter');
const swaggerDocument = require('./swagger.json'); 

const app = express();
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/membership', authRoutes);
app.use('/membership', userRoutes);
app.use('/transaction', transactionRoutes);
app.use('/information', informationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
