import * as express from 'express';
import { ObjectId } from 'mongodb';
import { collections } from './database';

export const employeeRouter = express.Router();
employeeRouter.use(express.json());

employeeRouter.get('/', async (_req, res) => {
    try {
        const employees = await collections?.employees?.find({}).toArray();
        res.status(200).send(employees);
    } catch (error) {
        res.status(500).send("Error fetching employees");
    }
});

employeeRouter.get('/:id', async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const employee = await collections?.employees?.findOne(query);

        if (employee) {
            res.status(200).send(employee);
        } else {
            res.status(404).send(`Employee not found: ID ${id}`);
        }
    } catch (error) {
        res.status(500).send(`Error fetching employee: ID ${req?.params?.id}`);
    }
});

employeeRouter.post('/', async (req, res) => {
    try {
        const newEmployee = req.body;
        console.log('Received employee data:', newEmployee);
        
        const result = await collections?.employees?.insertOne(newEmployee);
        console.log('Insert result:', result);

        if (result?.acknowledged && result.insertedId){
            // Get the created employee from the database to ensure we have the correct format
            const createdEmployee = await collections?.employees?.findOne({ _id: result.insertedId });
            console.log('Created employee:', createdEmployee);
            
            res.status(201).json(createdEmployee);
        } else {
            res.status(500).send("Failed to create employee");
        }
    } catch (error) {
        console.error(`Error creating employee: ${error}`);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

employeeRouter.put('/:id', async (req, res) => {
    try {
        const id = req?.params?.id;
        const employee = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.employees?.updateOne(query, { $set: employee });

        if (result && result.matchedCount) {
            // Return the updated employee
            const updatedEmployee = { ...employee, _id: id };
            res.status(200).json(updatedEmployee);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Employee not found: ID ${id}`);
        } else {
            res.status(304).send(`Employee not updated: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

employeeRouter.delete('/:id', async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.employees?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(200).json({ message: `Successfully deleted employee with ID: ${id}`, deletedId: id });
        } else if (!result) {
            res.status(400).send(`Failed to remove Employee: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Employee not found: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    } 
});