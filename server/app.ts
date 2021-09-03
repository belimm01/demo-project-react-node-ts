import * as express from "express";
import * as bodyParser from "body-parser";

const cors = require('cors');

const port = 3030;

const app = express();
let routes = require('./src/controller/userController.ts');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

routes(app);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

export default app;
