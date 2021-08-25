import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import { init } from './routes';

const app = express();
const corsOptions ={
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create link to Angular build directory
app.use(express.static(path.join(__dirname, "/dist/ministry-planner/")));

app.use('/', express.Router());

init(app);

// non-root requests being redirected
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, "/dist/ministry-planner/", "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Express server running on port", port);
});