const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

router.get('/testdb', async (req, res, next) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT $1::text as message', ['Hello world!']);
    const message = result.rows[0].message;
    res.json({ message });
    client.release();
  } catch (err) {
    console.error('Error connecting to PostgreSQL:', err);
    res.status(500).json({ error: 'Failed to connect to PostgreSQL' });
  }
});