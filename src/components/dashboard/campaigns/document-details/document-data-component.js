import PdfViewer from '@/components/form/pdf-viewer';
import TweetViewer from '@/components/form/tweet-viewer';


export const DocumentDataComponent = (props) => {
    const {
        document,
        ...other
    } = props;

    let mainDataComponent = "document_url" in document.data ? "document_url" : "tweet_url";
    if (mainDataComponent === "tweet_url") {
        return <TweetViewer tweetUrl={document.data['tweet_url']}/>;
    } else {
        return <PdfViewer documentUrl={document.data['document_url']}/>;
    }
};
