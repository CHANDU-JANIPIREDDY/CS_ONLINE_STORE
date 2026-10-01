import React from 'react'

const images = [
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1800&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=80",
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1800&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=80",
]

function Background({heroCount}) {
    return (
        <img
            src={images[heroCount] || images[0]}
            alt=""
            className='absolute inset-0 h-full w-full object-cover object-center'
        />
    )
}

export default Background
