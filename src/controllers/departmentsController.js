import express from 'express';
import query from "../helpers/queries";
import { connect, releaseConnection } from "../db/index";
import { formatResults } from "../helpers/index";

const departmentsRouter = express.Router();

departmentsRouter.get('/getAllDepartments', async (req, res) => {
    let connection = await connect();
    let result = await connection.execute(query.GET_DEPARTMENTS);
    let fResults = formatResults(result)
    await releaseConnection(connection);
    return res.status(200).json(fResults);
                    
})

departmentsRouter.get('/getSingleDepartment/:departmentId', async (req, res) => {
    let departmentId = req.params.departmentId;
    let connection = await connect();
    let qury = `${query.GET_DEPARTMENT} ${departmentId}`;
    let result = await connection.execute(qury);
    if(result.rows.length == 0){
        return res.status(404).json({message: `No department exists in databse with Id ${departmentId}`});
    }
    let fResults = formatResults(result);
    await releaseConnection(connection);
    return res.status(200).json(fResults[0]);
})

export default departmentsRouter
