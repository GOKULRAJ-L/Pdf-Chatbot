import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createStore = async (docs, filename) => {
  try{
      const storeDir = path.join(__dirname,'..','vectorstore')
      const vectorDir = path.join(storeDir,filename);

      if(!fs.existsSync(vectorDir)) fs.mkdirSync(vectorDir,{recursive:true})

      const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GEMINI_API_KEY,
        modelName: "gemini-embedding-exp-03-07",
      });


      const vectorstore = await FaissStore.fromDocuments(docs,embeddings)
      
      await vectorstore.save(vectorDir)
      
  }catch(err){
    console.log(err.message);
  }
}


