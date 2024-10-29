import { useEffect, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import 'pdfjs-dist/legacy/build/pdf.worker.entry';
import './style.css'
type PDFDocumentProxy = pdfjsLib.PDFDocumentProxy;
type PDFPageProxy = pdfjsLib.PDFPageProxy;

// Set the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.js',
  import.meta.url
).toString();

const PDFTextExtractor = ({getText}:{getText:any}) => {
  const [text, setText] = useState<string>('');
  const [email,setEmail] = useState<string>('')
  
    useEffect(()=>{
        const dList:any = text.split('  ');
        console.log(dList);
        getText(dList)
    },[text])
  // Function to handle PDF text extraction
  const extractTextFromPDF = async (file: File) => {
    const fileReader = new FileReader();

    fileReader.onload = async () => {
      const pdfData = new Uint8Array(fileReader.result as ArrayBuffer);

      // Load the PDF document
      const pdf: PDFDocumentProxy = await pdfjsLib.getDocument(pdfData).promise;

      // Extract text from each page
      let fullText = '';
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page: PDFPageProxy = await pdf.getPage(pageNum);
        const content = await page.getTextContent();

        // Concatenate the text items from the page
        const pageText = content.items.map((item: any) => item.str).join(' ');
        fullText += `Page ${pageNum}: ${pageText}\n`;
      }
      setText(fullText);
    };

    fileReader.readAsArrayBuffer(file);
  };

  return (
    <div className='roboto-medium'>
      <div>
        <h1 className='roboto-medium '>Antiragging Declaration</h1>
        <h2>Step1 : Upload your online Payment Receipt 2023</h2>
      </div>
      <div className='fileinput'>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) extractTextFromPDF(file);
        }}
      />
      </div>
 
      <h2>Step 2: Enter your email</h2>
      <input className='emilin' type="text" placeholder='email' onChange={(e)=>{setEmail(e.target.value)}} />
     <button className='button-6' onClick={()=>{
      alert('Email is :' + email);
      setText(text+ '  ' + email)
     }}>Send</button>
      
    </div>
  );
};

export default PDFTextExtractor;
