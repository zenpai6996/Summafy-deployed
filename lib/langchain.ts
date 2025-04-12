import {PDFLoader} from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractPdfText(fileUrl:string){
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    // Convert the Blob to an ArrayBuffer
    const arrayBuffer = await blob.arrayBuffer();
    // Convert the Blob to a Buffer
    const pdfLoader = new PDFLoader(new Blob([arrayBuffer]));
    // Load the PDF document
    const docs = await pdfLoader.load();
    //combine all pages
    return docs.map((doc) => doc.pageContent).join('\n');
}