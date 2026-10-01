import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

function Card({ name, image, id, price }) {
  const { currency } = useContext(shopDataContext)
  const navigate = useNavigate()

  return (
    <article
      onClick={() => navigate(`/productdetail/${id}`)}
      className="group w-full cursor-pointer font-[Outfit,sans-serif]"
    >
      <div className="overflow-hidden border border-white/15 bg-[#0e1a1e] transition duration-300 group-hover:border-[#8ee9f2]">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="bg-[#132226] px-3.5 py-3 text-left">
          <h3 className="truncate text-[15px] font-medium text-white">
            {name}
          </h3>
          <p className="mt-1 text-[13px] font-semibold tracking-wide text-[#8ee9f2]">
            {currency} {price}
          </p>
        </div>
      </div>
    </article>
  )
}

export default Card
