import React from 'react';
import YouTube from 'react-youtube';

// Boilerplate code for if we want to add Youtube Integration to our Resources or About page (move eventually)
class Map extends React.Component {
    render() {
        const options = {
            height: '390',
            width: '640',
            playerVars: {
                autoplay: 1,
                controls: 1,
            },
        };
        return <YouTube videoId="h2rR77VsF5c" options={options} onReady={this._onReady} id="video"/>;
    }
    _onReady(event) {
        event.target.playVideo();
      }
}

export default Map;