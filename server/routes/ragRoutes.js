import express, { Router } from 'express'
import { upload } from '../config/multer.js'
import path from 'path'
import { fileURLToPath } from 'url'
import {ChatGroq} from '@langchain/groq'
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { ChatPromptTemplate } from "@langchain/core/prompts"
import { createStuffDocumentsChain } from "langchain/chains/combine_documents"
import { createRetrievalChain } from "langchain/chains/retrieval"
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { loadPdf } from '../utils/loadPdf.js'
import { createStore } from '../utils/createStore.js'

 

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const router = express.Router()

router.post('/upload', upload.single("pdf"), async(req,res)=>{

    const filePath = path.join(__dirname,"..","uploads",req.file.filename)
    
    try{

        const docs = await loadPdf(filePath)

        await createStore(docs,req.file.filename)

        res.json({
            message : `PDF uploaded successfully ${req.file.filename}`
        })

    }catch(err){
        res.json({
            error : err.message
        })
    }
})

router.post('/chat', async (req, res) => {
  const { question, filename } = req.body

  try {
    const storeDir = path.join(__dirname, '..', 'vectorstore')
    const vectorDir = path.join(storeDir, filename)

    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GEMINI_API_KEY,
      modelName: "gemini-embedding-exp-03-07",
    })

    const vectorstore = await FaissStore.load(vectorDir, embeddings)

    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
    })

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "Use the context below to answer the user's question. Keep it clear and meaningful in reading. And also avoid using accorindg to the context provided or infromation provided . Give the answer to the question that realted to context. Any other question that are not realted don't answer to it. Just give an kind reply in 20 words.\nContext:\n{context}"],
      ["human", "{input}"],
    ])

    const combineDocsChain = await createStuffDocumentsChain({
      llm: model,
      prompt,
    })

    const chain = await createRetrievalChain({
      retriever: vectorstore.asRetriever(),
      combineDocsChain,
    })

    const result = await chain.invoke({ input: question })

    res.json({ 
        message: result.answer 
    }) 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message })
  }
})


export default router