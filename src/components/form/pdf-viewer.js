import {Viewer, Worker} from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';


const PdfViewer = (props) => {
	const {
		documentUrl,
		...other
	} = props;

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        toolbarPlugin: {},
    });
	
	return (
		<Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">
			<Viewer fileUrl={documentUrl}
					plugins={[defaultLayoutPluginInstance]}/>
		</Worker>
	);
}

export default PdfViewer;
