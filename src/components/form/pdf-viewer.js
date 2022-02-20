import { useEffect, useRef } from "react";
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';


const PdfViewer = (props) => {
	const containerRef = useRef(null);

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        toolbarPlugin: {},
    });
	
	return (
		<Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
			<Viewer fileUrl="https://funcrowd-documents.sprawdzamyjakjest.pl/static/pdf/monitoring42/34181.pdf"
					plugins={[defaultLayoutPluginInstance]}/>
		</Worker>
	);
}

export default PdfViewer;
