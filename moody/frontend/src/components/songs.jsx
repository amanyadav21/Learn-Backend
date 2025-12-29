import React from 'react'
import { Icon } from '@iconify/react'
import './common.css'

const Songs = ({ songs, mood }) => {

    return (
        <div className="songs">
            <h2>Songs {mood && `- ${mood}`}</h2>
            {songs && songs.length > 0 ? (
                songs.map((song, index) => (
                    <div key={index} className="song-item">
                        <h3>{song.title}</h3>
                        <p>{song.artist}</p>
                        <p className="mood-badge">Mood: {song.mood}</p>
                        <audio controls style={{width: '100%', marginTop: '10px'}}>
                            <source src={song.audio} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                        <div className="song-actions">
                            <button type="button" title="Play" className="icon-button">
                                <Icon icon="material-symbols-light:play-arrow" width="24" height="24" />
                            </button>
                            <button type="button" title="Pause" className="icon-button">
                                <Icon icon="material-symbols-light:pause" width="24" height="24" />
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="no-songs">
                    {mood ? `No songs found for ${mood} mood. Detect your mood first!` : 'Detect your mood to see songs!'}
                </p>
            )}
        </div>
    )
}

export default Songs