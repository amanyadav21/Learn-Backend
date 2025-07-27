import React, { useState } from 'react'

const MusicPlayer = () => {
    const [songs, setSongs] = useState([
        {
            title: 'Song Title',
            artist: 'Artist Name',
            url: 'test_url',
        },
        {
            title: 'Song Title',
            artist: 'Artist Name',
            url: 'test_url',
        },
        {
            title: 'Song Title',
            artist: 'Artist Name',
            url: 'test_url',
        },
        {
            title: 'Song Title',
            artist: 'Artist Name',
            url: 'test_url',
        },
        {
            title: 'Song Title',
            artist: 'Artist Name',
            url: 'test_url',
        },

    ])
    return (
        <div className="music-player">
            <h2> 🎵 Recommanded Songs</h2>
                {songs.map((song, index) => (
                    <div className='song-item' key={index}>
                        <h3>{song.title}</h3>
                        <p>{song.artist}</p>
                        <div className='play-pause-icon'>
                            <i className="ri-pause-line"></i>
                            <i className="ri-play-reverse-line"></i>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default MusicPlayer