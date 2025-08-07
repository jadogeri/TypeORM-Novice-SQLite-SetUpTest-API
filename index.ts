import * as express from "express";
import { AppDataSource } from "./src/data-source";
import { User } from "./src/entities/User";

AppDataSource.initialize()
    .then(async () => {
        const app = express();
        app.use(express.json());

        const userRepository = AppDataSource.getRepository(User);

        // CREATE
        app.post("/users", async (req, res) => {
            const user = userRepository.create(req.body);
            await userRepository.save(user);
            res.status(201).json(user);
        });

        // READ (All)
        app.get("/users", async (req, res) => {
            const users = await userRepository.find();
            res.json(users);
        });

        // READ (One)
        app.get("/users/:id", async (req, res) => {
            const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
            if (user) {
                res.json(user);
            } else {
                res.status(404).send("User not found");
            }
        });

        // UPDATE
        app.put("/users/:id", async (req, res) => {
            const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
            if (user) {
                userRepository.merge(user, req.body);
                await userRepository.save(user);
                res.json(user);
            } else {
                res.status(404).send("User not found");
            }
        });

        // DELETE
        app.delete("/users/:id", async (req, res) => {
            const result = await userRepository.delete(parseInt(req.params.id));
            if (result // && result.affected > 0

            ) {
                res.status(204).send(); // No Content
            } else {
                res.status(404).send("User not found");
            }
        });

        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });
    })
    .catch((error) => console.log(error));