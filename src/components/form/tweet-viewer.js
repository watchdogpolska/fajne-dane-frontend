import {TwitterTweetEmbed} from 'react-twitter-embed';


const TweetViewer = (props) => {
	const {
		tweetUrl,
		...other
	} = props;
	let parts = tweetUrl.split('/');
	let tweetId = parts[parts.length - 1];

	return (
		<TwitterTweetEmbed tweetId={tweetId}/>
	)
}

export default TweetViewer;
