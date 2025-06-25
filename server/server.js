import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import fs from 'fs'
import ragRoutes from './routes/ragRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const uploadDir = path.join(__dirname,"uploads")
const vectorDir = path.join(__dirname,"vectorstore")

if(!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir,{recursive:true})
if(!fs.existsSync(vectorDir)) fs.mkdirSync(vectorDir,{recursive:true})

app.use('/api',ragRoutes)

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on the port: ${PORT}`)
})
