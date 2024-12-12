import express from 'express';
import cors from 'cors';
import routes from './routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors())
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);  

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
