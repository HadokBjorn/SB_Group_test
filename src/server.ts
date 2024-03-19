import express, { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = 5000
app.listen(PORT,()=>console.log(`Project running in port ${PORT}`))
