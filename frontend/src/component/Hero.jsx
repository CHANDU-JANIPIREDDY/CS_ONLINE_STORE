import React from 'react'
import { useNavigate } from 'react-router-dom'

const slides = [0, 1, 2, 3]

const Hero = ({ heroData, heroCount, setHeroCount }) => {
  const navigate = useNavigate()

  return (
    <div className='w-full max-w-xl'>
      <p className='text-[11px] uppercase tracking-[0.32em] text-[#d8fcff] sm:text-xs'>CS Store</p>
      <h1 className='mt-3 font-[Outfit,sans-serif] text-[32px] font-medium leading-[1.12] text-white sm:text-5xl lg:text-6xl'>
        {heroData.text1}
      </h1>
      <p className='mt-3 max-w-md text-sm text-white/85 sm:text-lg'>{heroData.text2}</p>
      <button
        type='button'
        onClick={() => navigate('/collection')}
        className='mt-6 h-11 cursor-pointer bg-white px-6 text-sm font-semibold tracking-wide text-[#0c2025] transition hover:bg-[#d8fcff]'
      >
        Shop Collection
      </button>
      <div className='mt-8 flex items-center gap-2'>
        {slides.map((index) => (
          <button
            key={index}
            type='button'
            aria-label={`Show slide ${index + 1}`}
            onClick={() => setHeroCount(index)}
            className={`h-[3px] cursor-pointer transition-all ${heroCount === index ? 'w-10 bg-white' : 'w-5 bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero
