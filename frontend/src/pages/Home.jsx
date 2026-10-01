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
      <section className='relative mt-[70px] h-[78vh] min-h-[480px] overflow-hidden bg-[#0c2025] lg:h-[calc(100vh-70px)] lg:min-h-[560px]'>
        <Background heroCount={heroCount} />
        <div className='absolute inset-0 bg-gradient-to-t from-[#0c2025]/80 via-[#0c2025]/25 to-[#0c2025]/20 sm:bg-gradient-to-r sm:from-[#0c2025]/80 sm:via-[#0c2025]/35 sm:to-transparent' />
        <div className='relative z-10 flex h-full items-end px-5 pb-8 sm:items-center sm:px-12 lg:px-16'>
          <Hero
            heroCount={heroCount}
            setHeroCount={setHeroCount}
            heroData={heroData[heroCount]}
          />
        </div>
      </section>

      <Product />
      <OurPolicy />
      <NewLetterBox />
      <Footer />
    </div>
  )
}

export default Home
