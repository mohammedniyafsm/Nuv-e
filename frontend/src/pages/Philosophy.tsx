import { useLocation } from 'react-router-dom';
import Git from '../components/icons/Git'
import Navbar from '../components/Navbar'
import { useEffect } from 'react';

function Philosophy() {

  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>

      <div className='bg-[#F2F2F2] w-screen min-h-screen flex flex-col'>
        <Navbar />
        <div className="relative flex-grow px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="pt-8 sm:pt-16 md:pt-24 lg:pt-30">
            <h1 className='text-4xl mt-10 sm:mt-0 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#2E2E2E]'>
              <span className='font-ITCGaramondStd-BkIta text-[1.2em]'>Be </span>
              <span className='font-neogroteskessalt-boldit'>Eternal</span>
            </h1>
          </div>

          <div className="absolute inset-0 flex justify-center ml-8 sm:ml-0 items-center md:left-[20%] lg:left-[180px] md:top-0 lg:top-15">
            <img className='h-auto max-h-[80vh] md:h-[500px] lg:h-[700px] w-auto' src="./public/images/mask.png" alt="Mask" />
          </div>

          <div className="absolute bottom-18 sm:bottom-4 right-4 sm:right-8 md:right-14 text-right">
            <h1 className='text-4xl  sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#2E2E2E]'>
              <span className='font-ITCGaramondStd-BkIta text-[1.2em]'>Be </span>
              <span className='font-neogroteskessalt-boldit'>Nuvée</span>
            </h1>
          </div>
          <div className="absolute bottom-4 left-4 sm:left-8 md:bottom-14 md:left-0 lg:left-6">
            <p className='text-[#9C8080] font-neogroteskessalt-light text-[8px] sm:text-xs md:text-xs max-w-xs md:max-w-md'>
              Fragrance is more than scent — it is essence. <br />
              At Nuvée, we craft perfumes that awaken <br />
              confidence, beauty, and timeless allure.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#F2F2F2] w-screen min-h-screen flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 pt-8 md:pt-24 lg:pt-42">

        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-md lg:max-w-lg">
          <h1 className='font-neogrotesk-regular text-center text-2xl sm:text-3xl md:text-4xl text-[#2E2E2E] mb-6 md:mb-10'>
            We craft perfumes <br />
            that truly resonate—no <br />
            <span className='font-ITCGaramondStd-BkCondIta'>compromises !</span>
          </h1>
          <img src="./public/images/sp2.jpg" className='h-48  sm:h-60 md:h-72 w-auto rounded-3xl md:rounded-4xl mb-4 md:mb-5 lg:ml-16' alt="Perfume detail" />
          <p className='font-neogroteskessalt-light text-xs text-center sm:text-xs text-[#9C8080] max-w-[80%] md:max-w-[310px]'>
            Drawing on over 30 years of expertise in natural essences and
            the art of fragrance, we blend authentic ingredients with modern
            mastery to create scents that are pure, memorable,
            and responsibly made.
          </p>
        </div>

        <div className="hidden md:block relative md:w-1/2 lg:right-0 lg:w-auto">
          <img src="./public/images/philo2.png" className='h-auto max-h-[80vh] md:h-[400px] lg:h-[564px] w-auto' alt="Philosophy image" />
        </div>
      </div>

      <div className="bg-[#F2F2F2] w-screen min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 pt-16 md:pt-32 lg:pt-40">
        <h1 className='text-3xl sm:text-4xl md:text-5xl text-[#2E2E2E] font-neogroteskessalt-light mb-8 md:mb-96 lg:pl-22'>
          Pure Ingredients, <br /> <span className='font-ITCGaramondStd-BkIta'>Radical</span> Transparency
        </h1>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-[#9C8080] text-xs md:text-base max-w-full md:max-w-[667px] lg:absolute lg:right-12 lg:pt-80">
          <p className='flex-1'>
            We craft our perfumes with only the finest,
            proven essences — sourced responsibly,
            blended in harmony, and always free from
            synthetic shortcuts and harmful additives.
          </p>
          <p className='flex-1'>
            With nothing to hide and no black boxes, we
            believe you deserve to know exactly what
            goes into every scent. From the first note to
            the lasting trail, every drop is crafted.
          </p>
        </div>
      </div>

      <div className="w-screen min-h-[50vh] md:h-screen">
        <img src="./public/images/1k.jpg" className='h-full w-full object-cover' alt="Full screen image" />
      </div>

      <div className="bg-[#F2F2F2] w-screen min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 pt-16 md:pt-32 lg:pt-40">
        <h1 className='text-3xl sm:text-4xl md:text-5xl text-[#2E2E2E] font-neogroteskessalt-light mb-8 md:mb-12 text-left md:text-right lg:pr-10'>
          Thoughtful Packaging, <br /> <span className='font-ITCGaramondStd-BkIta'>Sustainably</span> Made.
        </h1>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-[#9C8080] text-xs md:text-base max-w-full md:max-w-[667px] lg:mb-10 lg:pt-80">
          <p className='flex-1'>
            We craft our perfumes with only the finest,
            proven essences — sourced responsibly,
            blended in harmony, and always free from
            synthetic shortcuts and harmful additives.
          </p>
          <p className='flex-1'>
            With nothing to hide and no black boxes, we
            believe you deserve to know exactly what
            goes into every scent. From the first note to
            the lasting trail, every drop is crafted.
          </p>
        </div>
      </div>

      <div className="bg-white w-full min-h-[300px] md:h-auto py-8 md:py-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-28 px-4 sm:px-8 md:px-20">
          {/* Explore */}
          <div className="flex flex-col gap-2 text-[#3b3b3b] font-neogrotesk-ultralight text-sm">
            <h1 className="font-neogroteskessalt-light text-xs text-[#a0a0a0]">EXPLORE</h1>
            <h1>Shop</h1>
            <h1>Philosophy</h1>
            <h1>Gallery</h1>
            <h1>Journal</h1>
            <h1>Sign Up / Login</h1>
          </div>

          {/* Follow Us */}
          <div className="flex flex-col gap-2 text-[#3b3b3b] font-neogrotesk-ultralight text-sm">
            <h1 className="font-neogroteskessalt-light text-xs text-[#a0a0a0]">FOLLOW US</h1>
            <h1>Instagram</h1>
            <h1>Facebook</h1>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col gap-2 text-[#3b3b3b] font-neogrotesk-ultralight text-sm">
            <h1 className="font-neogroteskessalt-light text-xs text-[#a0a0a0]">CONTACT US</h1>
            <a href="mailto:nuvee@gmail.com" className="hover:underline">nuvee@gmail.com</a>
            <span>1111–2222–3333</span>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-8 md:mt-0 px-4 sm:px-8 md:px-20">
          {/* Logo & Tagline */}
          <div className="py-6 md:py-12">
            <img className="h-10 md:h-14 w-auto" src="./public/images/logo.png" alt="Nuvee Logo" />
            <p className="text-[#a0a0a0] text-[10px] mt-2">
              Clean, Conscious, Clinical Perfume! <br />
              Honest products that truly work
            </p>
            <p className="text-[#3b3b3b] text-[10px] mt-4">© 2025 Nuvee, All Rights Reserved</p>
          </div>

          {/* Developer Credit */}
          <div className="py-6 md:py-8 flex items-center gap-2">
            <h1 className="text-[#a0a0a0] text-sm">
              designed and developed by{' '}
              <a
                href="https://x.com/n1yaf_/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline cursor-pointer text-[#3b3b3b]"
              >
                @n1yaf_
              </a>
            </h1>
            <a href="https://github.com/mohammedniyafsm" target="_blank" rel="noopener noreferrer">
              <Git />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Philosophy