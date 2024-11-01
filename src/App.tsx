import { useEffect, useState } from 'react';
import './App.css';

import PDFTextExtractor from './component/pdfExtract';
import PDFTextEditor from './component/pdftexteditor';
import Footer from './component/footer/footer';
import NoticePopup from './component/notice';


function App() {
  const [text, setText] = useState<any>(['']);
  useEffect(()=>{
    
    console.log(text);
    
  },[text])
  const getText = (ltext: any) => {
    console.log(ltext);
    setText(ltext)
    
    
  };

  return (
    <>
      <NoticePopup />
      <PDFTextExtractor getText={getText} />
      <PDFTextEditor sendText={text}/>
      <Footer/>
    </>
  );
}

export default App;
