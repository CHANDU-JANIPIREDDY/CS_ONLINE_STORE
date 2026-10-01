import React from 'react'

const images = [
    "https://res.cloudinary.com/dymntfrwl/image/upload/v1755863330/WhatsApp_Image_2025-08-22_at_5.05.14_PM_1_lsgmzu.jpg",
    "https://res.cloudinary.com/dymntfrwl/image/upload/v1755863360/WhatsApp_Image_2025-08-22_at_5.05.15_PM_gpxpcm.jpg",
    "https://res.cloudinary.com/dymntfrwl/image/upload/v1755863368/WhatsApp_Image_2025-08-22_at_5.05.15_PM_1_ddchsx.jpg",
    "https://res.cloudinary.com/dymntfrwl/image/upload/v1755863378/WhatsApp_Image_2025-08-22_at_5.05.14_PM_ejwqz4.jpg",
]

function Background({heroCount}) {
    return (
        <img
            src={images[heroCount] || images[0]}
            alt=""
            className='absolute inset-0 w-full h-full object-cover'
        />
    )
}

export default Background
