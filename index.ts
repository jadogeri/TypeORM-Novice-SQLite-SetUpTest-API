
import { AppDataSource } from "./src/data-source";
import { Employee } from "./src/entities/Employee";
import express, { Response, Request } from "express";

AppDataSource.initialize()
    .then(async () => {
        const app = express();
        app.use(express.json());

        const employeeRepository = AppDataSource.getRepository(Employee);

        // CREATE
        app.post("/employees", async (req : Request, res: Response) => {
            const employee = employeeRepository.create(req.body);
            await employeeRepository.save(employee);
            res.status(201).json(employee);
        });

        // READ (All)
        app.get("/employees", async (req, res) => {
            const employees = await employeeRepository.find();
            res.json(employees);
        });

        // READ (One)
        app.get("/employees/:id", async (req, res) => {
            const employee = await employeeRepository.findOneBy({ id: parseInt(req.params.id) });
            if (employee) {
                res.json(employee);
            } else {
                res.status(404).send("Employee not found");
            }
        });

        // UPDATE
        app.put("/employees/:id", async (req, res) => {
            const employee = await employeeRepository.findOneBy({ id: parseInt(req.params.id) });
            if (employee) {
                employeeRepository.merge(employee, req.body);
                await employeeRepository.save(employee);
                res.json(employee);
            } else {
                res.status(404).send("Employee not found");
            }
        });

        // DELETE (One)
        app.delete("/employees/:id", async (req, res) => {
            const result = await employeeRepository.delete(parseInt(req.params.id));
            if (result.affected as number > 0

            ) {
                res.status(204).send(); // No Content
            } else {
                res.status(404).send("Employee not found");
            }
        });

        // DELETE (All)
        app.delete("/employees", async (req, res) => {
            const result = await employeeRepository.deleteAll();
            if (result.affected as number > 0

            ) {
                res.status(204).send(); // No Content
            } else {
                res.status(404).send("Employee not found");
            }
        });

        app.listen(4000, () => {
            console.log("Server running on port 4000");
        });
    })
    .catch((error) => console.log(error));
    