import React, { useEffect, useState } from 'react'
import Background from '../component/Background'
import Hero from '../component/Hero'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'

const Home = () => {
  let heroData = [
    { text1: "30% Off Limited Offer", text2: "Style that" },
    { text1: "Discover the Best of BoldFashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection", text2: "Shop Now and Save Big!" },
    { text1: "Choose Your Perfect Fashion Fit", text2: "Now On Sale!" }
  ]

  let [heroCount, setHeroCount] = useState(0)

  useEffect(() => {
    let interval = setInterval(() => {
      setHeroCount(prevCount => (prevCount === 3 ? 0 : prevCount + 1))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='w-full overflow-x-hidden'>
      <div className='relative mt-[70px] w-full h-[58vh] min-h-[320px] sm:h-[64vh] lg:h-[calc(100vh-70px)] lg:min-h-[520px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]'>
        <Background heroCount={heroCount} />
        <div className='absolute inset-0 bg-gradient-to-r from-[#0c2025]/90 via-[#0c2025]/55 to-transparent' />
        <Hero
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={heroData[heroCount]}
        />
      </div>

      <Product />
      <OurPolicy />
      <NewLetterBox />
      <Footer />
    </div>
  )
}

export default Home
