import {UserCredentialsEntity} from "../entity/userCredentialsEntity";
import {dbConnection} from "../db/connection";

let appRouter = (app) => {
    app.post("/api/user/credentials/save", (req, res) => {
        const userCredentialsEntity = new UserCredentialsEntity();
        userCredentialsEntity.email = req.body.email;
        userCredentialsEntity.password = req.body.password;
        res.send(dbConnection.manager.save(userCredentialsEntity));
    });

    app.get("/api/user/credentials/all", async (req, res) => {
        res.send(await dbConnection.manager.find(UserCredentialsEntity));
    });
};

module.exports = appRouter;