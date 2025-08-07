import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User"; // Assuming you have a User entity

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite", // Name of your SQLite database file
    synchronize: true, // Automatically create/update tables based on entities (for development)
    logging: false, // Set to true for detailed SQL logging
    entities: [User], // List your entities here
    migrations: [],
    subscribers: [],
});