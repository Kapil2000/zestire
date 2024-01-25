import dotenv from 'dotenv'
dotenv.config()
import  express  from 'express';
const app = express();
import router from './router/auth-router.js';
import connectDb from './utils/db.js';

app.use(express.json());

app.use("/api/auth", router);

const PORT = 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT}`);
  });
});
