import PdfViewer from '@/components/form/pdf-viewer';
import TweetViewer from '@/components/form/tweet-viewer';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import {
    Card, CardContent, Typography
} from '@mui/material';


const NoData = (props) => {
    return <Card sx={{textAlign: "center", width: "fit-content", mx: "auto", my: "30px", p: "30px"}}>
        <CardContent>
            <AssignmentLateIcon fontSize="large" />
            <Typography variant="h5">
                Brak danych
            </Typography>
            <Typography color="textSecondary"
                        sx={{mt: 2}}
                        variant="body2">
                Ten dokument nie zawiera danych.
            </Typography>
        </CardContent>
    </Card>
};



export const DocumentDataComponent = (props) => {
    const {
        document,
        ...other
    } = props;

    if (Object.keys(document.data).length === 0) {
        return <NoData/>;
    }

    let mainDataComponent = "document_url" in document.data ? "document_url" : "tweet_url";
    if (mainDataComponent === "tweet_url") {
        return <TweetViewer tweetUrl={document.data['tweet_url']}/>;
    } else {
        return <PdfViewer documentUrl={document.data['document_url']}/>;
    }
};
