import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import {RecursiveCharacterTextSplitter} from "@langchain/textsplitters"


export const loadPdf = async (pdfpath)=> {
    try{

        const loader = new PDFLoader(pdfpath,
            {
                splitPages: false,
                parsedItemSeparator: ""
            }
        )
        const docs = await loader.load()

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize:500,
            chunkOverlap:50
        })

        const document =  await splitter.splitDocuments(docs)
        
        return document

    }catch(err){
        console.log(err.message)
    }
}
