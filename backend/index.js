import express from 'express'
import { PrismaClient } from '@prisma/client/edge'


const prisma = new PrismaClient();
const app = express();

//json
app.use(express.json());


//cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Context-Type');
    next()
})


//test api with error 500 in case of error
app.get('/test', (req, res) => {
    try {
        res.status(200).json({
            message: 'API is working'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})


app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(201).json(users)
    } catch (error) {
        res.status(500).json({
            message: error.message 
        })
    }
})

//start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server runnung on port ${PORT}`));