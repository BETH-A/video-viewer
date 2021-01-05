import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youTube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import Footer from './Footer';
import './App.css';

const KEY = process.env.REACT_APP_API_KEY;

class App extends React.Component {
    state = { videos: [], selectedVideo: null };

    componentDidMount() {
        this.onTermSubmit('coding');
    }

    onTermSubmit = async term => {
        console.log(term);
        const response = await youtube.get('/search', {
            params: {
            q: term,
            part: 'snippet',
            maxResults: 5,
            type: 'video',
            key: KEY,
            },
        });
        console.log(response);

        this.setState({ 
            videos: response.data.items, 
            selectedVideo: response.data.items[0]
        });
    };

    onVideoSelect = (video) => {
        console.log('From the App!', video);

        this.setState({ selectedVideo: video });
    }

    render() {
        return (
        <div className="ui container">
            <SearchBar onFormSubmit={this.onTermSubmit} />
            <div className="ui grid">
                <div className="ui row">
                    <div className="eleven wide column">
                        <VideoDetail video={this.state.selectedVideo} />
                    </div>
                    <div className="five wide column">
                        <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        );
    }
}

    export default App;