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
    </>
  )
}

export default Philosophy
