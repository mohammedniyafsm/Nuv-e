import Git from '../components/icons/Git'
import Navbar from '../components/Navbar'

function Philosophy() {
  return (
    <>

      <div className='bg-[#F2F2F2] w-screen h-screen'>
        <Navbar />
        <div className="pt-30 px-12">
          <div className="">
            <h1 className='text-8xl text-[#2E2E2E]'>
              <span className='font-ITCGaramondStd-BkIta text-[110px]'>Be </span>
              <span className='font-neogroteskessalt-boldit'>Eternal</span>
            </h1>
          </div>
          
          <div className="absolute top-15 left-[380px] ">
            <img  className='h-[700px] ' src="./public/images/mask.png" alt="" />
          </div>

          <div className="absolute bottom-4 right-14">
            <h1 className='text-8xl text-[#2E2E2E]'>
              <span className='font-ITCGaramondStd-BkIta text-[110px]'>Be </span>
              <span className='font-neogroteskessalt-boldit'>Nuvée</span>
            </h1>
          </div>
          <div className="absolute bottom-14">
            <p className='text-[#9C8080] font-neogroteskessalt-light text-xs'>Fragrance is more than scent — it is essence. <br />
              At Nuvée, we craft perfumes that awaken <br />
              confidence, beauty, and timeless allure.</p>
          </div>
        </div>
      </div>

      <div className="bg-[#F2F2F2] w-screen h-screen flex pt-42  ">

        <div className="flex justify-center px-20">
          <div className="flex flex-col pl-22">

            <div className="">
              <h1 className='font-neogrotesk-regular text-center text-4xl text-[#2E2E2E]'>We craft perfumes <br />
                that truly resonate—no <br />
                <span className='font-ITCGaramondStd-BkCondIta'>compromises !</span>
              </h1>
            </div>
            <div className="flex flex-col items-center mt-10">
              <img src="./public/images/sp2.jpg" className='h-72 w-52 pb-5 rounded-4xl' alt="" />
              <h1 className='font-neogroteskessalt-light text-xs text-[#9C8080] w-[360px] text-center'> Drawing on over 30 years of expertise in natural essences and
                the art of fragrance, we blend authentic ingredients with modern
                mastery to  create scents that are pure, memorable,
                and responsibly made. </h1>
            </div>
          </div>
        </div>


        <div className="absolute right-0 ">
          <img src="./public/images/philo2.png " className='h-[564px]  ' alt="" />
        </div>
      </div>

      <div className="bg-[#F2F2F2] h-screen w-screen">
        <div className="text-5xl text-[#2E2E2E] pt-40 pl-22">
          <h1 className='font-neogroteskessalt-light'>Pure Ingredients, <br /> <span className='font-ITCGaramondStd-BkIta '>Radical</span>  Transparency</h1>
        </div>

        <div className="flex gap-4 text-[#9C8080] w-[667px] text-sm absolute right-12 pt-80">
          <h1>We craft our perfumes with only the finest,
            proven essences — sourced responsibly,
            blended in harmony, and always free from
            synthetic shortcuts and harmfuladditives.
          </h1>
          <h1>With nothing to hide and no black boxes, we 
            believe you deserve to know exactly what 
            goes into every scent. From the first note to 
            the lasting trail, every drop is crafted .</h1>
        </div>

      </div>

      <div className="w-screen h-screen">
        <img src="./public/images/1k.jpg" className='h-screen w-screen' alt="" />
      </div>

      <div className="bg-[#F2F2F2] h-screen w-screen">
        <div className="text-5xl text-[#2E2E2E] pt-40 pl-22 flex justify-end px-10">
          <h1 className='font-neogroteskessalt-light text-end'>Thoughtful Packaging, <br /> <span className='font-ITCGaramondStd-BkIta '>Sustainably </span>  Made.</h1>
        </div>

        <div className="flex gap-4 text-[#9C8080] w-[667px] text-sm justify-start px-10  pt-80">
          <h1>We craft our perfumes with only the finest,
            proven essences — sourced responsibly,
            blended in harmony, and always free from
            synthetic shortcuts and harmfuladditives.
          </h1>
          <h1>With nothing to hide and no black boxes, we 
            believe you deserve to know exactly what 
            goes into every scent. From the first note to 
            the lasting trail, every drop is crafted .</h1>
        </div>

      </div>

      <div className="bg-white w-full h-[460px]">
        <div className="flex gap-28 px-20 py-10">
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
        <div className="flex justify-between items-end">
          {/* Logo & Tagline */}
          <div className="px-20 py-12">
            <img className="h-14 w-28" src="./public/images/logo.png" alt="Nuvee Logo" />
            <p className="text-[#a0a0a0] text-[10px]">
              Clean, Conscious, Clinical Perfume! <br />
              Honest products that truly work
            </p>
            <p className="text-[#3b3b3b] text-[10px] mt-4">© 2025 Nuvee, All Rights Reserved</p>
          </div>

          {/* Developer Credit */}
          <div className="px-16 py-8 flex items-center gap-2">
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
            <a href="https://github.com/mohammedniyafsm"  target="_blank" > <Git  /></a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Philosophy
