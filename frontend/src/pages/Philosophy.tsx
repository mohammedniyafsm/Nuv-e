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

      <div className="bg-[#F2F2F2] w-screen h-screen flex pt-50 ">

        <div className="flex justify-center px-20">
          <h1 className='font-neogrotesk-regular text-center text-4xl text-[#2E2E2E]'>We craft perfumes <br />
            that truly resonate—no <br />
            <span className='font-ITCGaramondStd-BkCondIta'>compromises !</span>
          </h1>
        </div>


        <div className="">

        </div>
      </div>

    </>
  )
}

export default Philosophy
