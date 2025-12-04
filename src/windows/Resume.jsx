import WindowControls from "#components/windowControls";
import windowWrapper from "#hoc/windowWrapper"
import { Download } from "lucide-react";
import { Document , Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();


const Resume = () => {
  return (
    <>
    <div id="window-header">
        <WindowControls target="resume"></WindowControls>
        <h2>Resume.pdf</h2>

        <a href="files/resume.pdf"  download className="cursor-pointer" title="Download Resume">
        
        <Download className="icon" />
        </a>

    </div>
    <div className="flex-1 overflow-auto w-full flex justify-center bg-gray-500/20">
        <Document file="files/resume.pdf" className="flex justify-center p-4">
            <Page pageNumber={1} renderAnnotationLayer renderTextLayer scale={1} />
        </Document>
    </div>
    </>
  )
}

const ResumeWindow = windowWrapper(Resume , "resume") ;
export default ResumeWindow ;