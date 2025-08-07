import { Response, Request } from "express";
import { Employee } from "../../entities/Employee";
import { AppDataSource } from "../../data-source";

//AppDataSource.initialize()
const employeeRepository = AppDataSource.getRepository(Employee);

export const addEmployee = async (req : Request, res: Response) => {
    const employee = employeeRepository.create(req.body);
    await employeeRepository.save(employee);
    res.status(201).json(employee);
}