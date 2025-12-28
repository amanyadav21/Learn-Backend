import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import './common.css'

const Songs = () => {
    const [songs, setSongs] = useState([
        {
            title: "test_title",
            artist: "test_artist",
            url: "test_url"
        },
        {
            title: "test_title",
            artist: "test_artist",
            url: "test_url"
        },
        {
            title: "test_title",
            artist: "test_artist",
            url: "test_url"
        }
    ])

    return (
        <div className="songs">
            <h2>Songs</h2>
            {songs.map((song, index) => (
                <div key={index} className="song-item">
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                    <a className="song-link" href={song.url}>{song.url}</a>
                    <div className="song-actions">
                        <button type="button" title="Play" className="icon-button">
                            <Icon icon="material-symbols-light:play-arrow" width="24" height="24" />
                        </button>
                        <button type="button" title="Pause" className="icon-button">
                            <Icon icon="material-symbols-light:pause" width="24" height="24" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Songs