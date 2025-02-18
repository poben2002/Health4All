import React from 'react';
import YouTube from 'react-youtube';

class LeBron extends React.Component {
    render() {
        const options = {
            height: '390',
            width: '640',
            playerVars: {
                autoplay: 1,
                controls: 1,
            },
        };
        return <YouTube videoId="fGbIrmC-L9o" options={options} onReady={this._onReady} id="video"/>;
    }
    _onReady(event) {
        event.target.playVideo();
      }
}

export default LeBron;