import { useEffect, useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import ad23PDF from './ad23.pdf';
import './style.css'
interface PDFTextEditorProps {
  sendText: string[];
}

const PDFTextEditor: React.FC<PDFTextEditorProps> = ({ sendText }) => {
  const [editedPdfUrl, setEditedPdfUrl] = useState<string | null>(null);
  const [tList, setTlist] = useState<string[]>([]);

  useEffect(() => {
    setTlist(sendText); // Update tList with the latest sendText data
  }, [sendText]);

  const editTextInPDF = async (pdfData: ArrayBuffer) => {
    const pdfDoc = await PDFDocument.load(pdfData);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0]; // Assuming you want to edit text on the first page
    const secondPage  = pages[1];
    const normalizedRed = 164 / 255;   // ≈ 0.6431
    const normalizedGreen = 82 / 255; // ≈ 0.3216
    const normalizedBlue = 63 / 255;   // ≈ 0.2471
    // Define coordinates for each line of text
    const edits = [
      { x: 40, y: 736, width: 300, height: 15, newText: tList[4] || 'REDACTED LINE 1' },
      { x: 40, y: 688, width: 300, height: 20, newText: tList[6] || 'REDACTED LINE 2' },
      { x: 40, y: 640, width: 300, height: 20, newText: tList[8] || 'REDACTED LINE 3' },
      { x: 40, y: 592, width: 300, height: 20, newText: tList[tList.length - 1] || 'REDACTED LINE 4' },
      { x: 40, y: 510, width: 300, height: 20, newText: tList[11] || 'REDACTED LINE 5' },
      { x: 243, y: 510, width: 300, height: 20, newText: tList[13] || 'REDACTED LINE 6' },
      { x: 40, y: 428, width: 300, height: 20, newText: tList[16] || 'REDACTED LINE 6' },
      { x: 243, y: 428, width: 300, height: 20, newText: tList[20] || 'REDACTED LINE 6' },
      { x: 40, y: 346, width: 300, height: 20, newText: tList[22] || 'REDACTED LINE 6' },
      { x: 40, y: 285, width: 285, height: 20, newText: tList[26] || 'REDACTED LINE 6' },
      { x: 40, y: 224, width: 285, height: 20, newText:'2023/2024' },
    ];
    const edits2 = [
      { x: 524, y:839,  newText: tList[20] || 'REDACTED LINE 2',color:rgb(normalizedRed, normalizedGreen, normalizedBlue),size:14 },
      { x: 67, y:188,  newText: tList[35] || 'REDACTED LINE 2',color:rgb(1,1,1),size:14 }
    ]
    const edits3 = [
      { x: 524, y:833,  newText: tList[20] || 'REDACTED LINE 2',color:rgb(normalizedRed, normalizedGreen, normalizedBlue),size:14 },
      { x: 67, y:38,  newText: tList[35] || 'REDACTED LINE 2',color:rgb(1,1,1),size:14 }
    ]
    
    edits.forEach((edit) => {
      
      

      
      firstPage.drawText(edit.newText, {
        x: edit.x,
        y: edit.y + 5,
        size: 9,
        color: rgb(0, 0, 0),
      });
    });
    edits2.forEach((edit2)=>{
      firstPage.drawText(edit2.newText,{
        x:edit2.x,
        y:edit2.y,
        size:edit2.size,
        color: edit2.color
      })
      
    })
    edits3.forEach((edit3)=>{
      secondPage.drawText(edit3.newText,{
        x:edit3.x,
        y:edit3.y,
        size:edit3.size,
        color: edit3.color
      })
      
    })

    // Save the edited PDF
    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setEditedPdfUrl(pdfUrl);
  };

  useEffect(() => {
    // Load the PDF file when the component mounts
    const fetchPDF = async () => {
      const response = await fetch(ad23PDF);
      const pdfData = await response.arrayBuffer();
      editTextInPDF(pdfData);
    };

    fetchPDF();
  }, [tList]); // Trigger PDF re-editing if tList changes

  return (
    <div>
      {tList.length > 10 ? <div>
      {editedPdfUrl ? (
        <a className='button-6 downloadbtn' href={editedPdfUrl} target="_blank" rel="noopener noreferrer">
          Download Edited PDF
        </a>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div> : <h3 className='roboto-regular'>Upload your online Payment Receipt 2023</h3>}
    </div>
  );
};

export default PDFTextEditor;
