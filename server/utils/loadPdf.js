import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import {RecursiveCharacterTextSplitter} from "@langchain/textsplitters"


export const loadPdf = async (pdfpath)=> {

    const loader = new PDFLoader(pdfpath)
    const docs = await loader.load()

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize:1000,
        chunkOverlap:200
    })

    const document =  await splitter.splitDocuments(docs)
    
    return document
}
