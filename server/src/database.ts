import * as mongodb from 'mongodb';
import { Employee } from './employee';

export const collections: {
    employees?: mongodb.Collection<Employee>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    
    try {
        console.log("Attempting to connect to MongoDB...");
        await client.connect();
        console.log("Connected to MongoDB successfully");
        
        const db = client.db('employee_db');
        await applySchemaValidation(db);

        const employeeCollection = db.collection<Employee>('employees');
        collections.employees = employeeCollection;
        console.log("Collections initialized successfully");
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }
}

async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "position", "level"],
            properties: {
                name: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                position: {
                    bsonType: "string",
                    description: "'position' must be a string and is required",
                    minLength: 5
                },
                level: {
                    bsonType: "string",
                    description: "'level' is required and is one of 'junior', 'mid', 'senior'",
                    enum: ["junior", "mid", "senior"]
                }
            }
        }
    };

    // Apply the schema validation to the collection
    try {
        await db.createCollection("employees", {
            validator: jsonSchema
        });
    } catch (error: any) {
        // Collection may already exist - this is normal, just continue silently
        if (!error.message.includes("already exists")) {
            console.log("Schema validation setup failed:", error.message);
        }
    }
}