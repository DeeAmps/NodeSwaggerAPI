import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './routes/index';



require('dotenv').config()
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/api', router);
app.get('/', (req, res)=>{
    res.send(`API running on /api`).status(200);
})
let port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Running on port ${port}`);
});
