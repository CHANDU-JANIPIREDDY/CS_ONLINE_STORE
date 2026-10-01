import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { shopDataContext } from '../context/ShopContext';
import { FaStar } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import RelatedProduct from '../component/RelatedProduct';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from '../component/Loading';

function ProductDetail() {
  let { productId } = useParams();
  let { products, currency, addtoCart } = useContext(shopDataContext);

  let [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [size, setSize] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProductData = () => {
    const foundProduct = products.find(item => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage1(foundProduct.image1);
      setImage2(foundProduct.image2);
      setImage3(foundProduct.image3);
      setImage4(foundProduct.image4);
      setImage(foundProduct.image1);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!size) {
      toast.warning("Please select a size before adding to cart!");
      return;
    }
    setLoading(true);
    addtoCart(productData._id, size);
    setTimeout(() => {
      toast.success(`${productData.name} added to cart!`);
      setLoading(false);
    }, 1000);
  };

  return productData ? (
    <div>
      <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col lg:flex-row items-start justify-center gap-6 pt-24 px-4 sm:px-6 lg:px-10 pb-8">
        <div className="lg:w-1/2 w-full flex flex-col-reverse sm:flex-row items-center justify-center gap-4">
          <div className="w-full sm:w-auto flex sm:flex-col flex-row gap-3 flex-wrap items-center justify-center">
            {[image1, image2, image3, image4].map((img, idx) => (
              img && (
                <div key={idx} className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-28 bg-slate-300 border border-[#80808049] rounded-md overflow-hidden shrink-0">
                  <img
                    src={img}
                    alt="thumb"
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setImage(img)}
                  />
                </div>
              )
            ))}
          </div>
          <div className="w-full sm:flex-1 max-w-xl h-[280px] sm:h-[380px] md:h-[460px] overflow-hidden shadow-md">
            <img src={image} alt="main" className="w-full h-full object-contain rounded-lg" />
          </div>
        </div>

       
        <div className="lg:w-1/2 w-full max-w-xl flex flex-col gap-3">
          <h1 className="text-2xl md:text-3xl text-white lg:text-4xl font-semibold text-aliceblue">{productData.name?.toUpperCase()}</h1>

          <div className="flex items-center gap-1">
            <FaStar className="text-lg fill-[#FFD700]" />
            <FaStar className="text-lg fill-[#FFD700]" />
            <FaStar className="text-lg fill-[#FFD700]" />
            <FaStar className="text-lg fill-[#FFD700]" />
            <FaStarHalfStroke className="text-lg fill-[#FFD700]" />
            <p className="text-sm md:text-base font-medium text-white pl-1">(124)</p>
          </div>

          <p className="text-xl md:text-2xl font-semibold text-white">{currency} {productData.price}</p>

          <p className="text-sm md:text-base lg:text-lg text-white leading-relaxed">
            {productData.description} Stylish, breathable cotton with a modern slim fit. Easy to wash, comfortable, and designed for effortless style.
          </p>

          <div className="flex flex-col gap-3 mt-3">
            <p className="text-lg md:text-xl font-semibold text-white">Select Size</p>
            <div className="flex flex-wrap gap-3">
              {productData.sizes?.map((item, index) => (
                <button
                  key={`${item}-${index}`}
                  className={`px-4 py-2 rounded-lg border transition-all duration-200 shadow-sm ${
                    item === size
                      ? 'bg-black text-[#2f97f1] font-bold scale-105'
                      : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              className="w-fit bg-[#495b61c9] text-white px-6 py-2 rounded-xl border border-[#80808049] shadow-md hover:bg-[#3c4a4ec9] transition-all"
              onClick={handleAddToCart}
            >
              {loading ? <Loading /> : "Add To Cart"}
            </button>
          </div>

          <div className="w-full h-px bg-slate-700 my-3"></div>

          <div className="text-xs md:text-sm text-white space-y-1 pb-5">
            <p>100% Original Product.</p>
            <p>Cash on delivery available.</p>
            <p>Easy return and exchange within 7 days.</p>
          </div>
        </div>
      </div>

     
      <div className="w-full bg-gradient-to-l from-[#141414] to-[#0c2025] pt-8 pb-28 lg:pb-12 flex flex-col">
        <div className="flex flex-wrap px-4 sm:px-6 lg:px-10 gap-3">
          <p className="border px-4 py-2 text-xs md:text-sm text-white">Description</p>
          <p className="border px-4 py-2 text-xs md:text-sm text-white">Reviews (124)</p>
        </div>
        <div className="w-[92%] md:w-[85%] lg:w-[70%] mx-auto my-5 bg-[#3336397c] text-white text-sm md:text-base lg:text-lg px-4 md:px-6 py-5 rounded-md">
          Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on CS-Store. Crafted from breathable,
          high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting, this
          shirt is a must-have essential for those who value both fashion and function.
        </div>
        <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id} />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

export default ProductDetail;
