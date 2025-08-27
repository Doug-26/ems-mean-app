import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './database';
import { employeeRouter } from './employee.routes';

// load environment variables from the .env files, where the ATLAS_URI is stored/configured
dotenv.config({ debug: false });

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable defined, exiting...");
    process.exit(1);
}

connectToDatabase(ATLAS_URI)
    .then(() => {
        console.log("Successfully connected to MongoDB");
        const app = express();
        app.use(cors());
        app.use('/employees', employeeRouter);

        //start the Express server
        app.listen(5200, () => {
            console.log("Server is running on port 5200");
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
        console.error("Error details:", error.message);
        process.exit(1);
    });