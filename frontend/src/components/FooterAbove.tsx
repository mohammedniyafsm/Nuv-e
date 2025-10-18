import Input from './ui/Input';
import { ArrowIcon } from './icons/ArrowIcon';
import Git from './icons/Git';

function FooterAbove() {
  return (
    <main>
      {/* ────── Background Section ────── */}
      <div className="relative bg-[url('/images/1k.jpg')] bg-cover bg-[center_50%] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[800px] xl:w-full">
        <div className="absolute py-8 md:py-10 lg:py-20 bg-[#232323] h-[330px] w-[220px] sm:h-[430px] sm:w-[320px]  right-5 top-16 md:h-[500px] md:w-[400px] 
            md:right-5 md:top-20 lg:h-[700px] lg:w-[550px] lg:top-[200px] lg:right-20 lg:bottom-0 xl:w-[550px] xl:h-[750px] xl:top-[100px] xl:right-20 xl:bottom-0 z-0">

          {/* Headline */}
          <div className="font-neogrotesk-bold text-center text-xl sm:text-3xl md:text-5xl lg:text-6xl  text-secondary">
            <h1>HEAR MORE</h1>
            <h1>FROM US</h1>
          </div>

          {/* Subtext */}
          <div className="text-center text-[10px] sm:text-xs py-2 text-[rgba(172,163,163,0.93)] md:text-xs md:py-2 lg:text-base lg:py-6">
            <p>Get the latest news about Perfumes</p>
            <p>tips and new products</p>
          </div>

          {/* Email Input */}
          <div className="flex justify-center mt-1 md:px-8 lg-mt-2 xl:mt-10 lg:px-16">
            <Input
              className="h-8 w-42 text-[12px] sm:w-64 sm:h-12 px-4 sm:mt-4 md:w-[450px] md:h-16 md:px- md:text-xs  lg:w-[450px] lg:h-16 lg:px-4 lg:text-xs text-[rgba(172,163,163,0.93)]"
              type="text"
              placeholder="ENTER YOUR EMAIL"
            />
          </div>

          {/* Subscribe Button */}
          <div className="flex justify-center pt-4 md:pt-12 lg:pt-6 xl:pt-16">
            <div className="flex flex-col items-center gap-2">
              <button className="bg-[#787878] h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-full flex justify-center items-center">
                <ArrowIcon className="text-white h-4 w-6 sm:h-8 sm:w-8 md:h-6 md:w-6" />
              </button>
              <h1 className="text-[rgba(172,163,163,0.93)] font-neogrotesk-ultralight text-[12px] md:text-xs lg:text-md underline">
                SUBSCRIBE
              </h1>
            </div>
          </div>

          {/* Divider */}
          <div className="px-10 pt-4 md:4 lg:pt-10">
            <hr className="border-[#787878]" />
          </div>

          {/* Disclaimer */}
          <div className="text-center font-neogrotesk-ultralight text-[rgba(138,122,122,0.93)] py-6 text-[8px] md:text-[10px] lg:text-xs pt-4 md:pt-4 lg:pt-16">
            <p>No Spam, only quality articles to help you be</p>
            <p>more radiant. You can opt out anytime.</p>
          </div>
        </div>
      </div>

      {/* ────── Footer Section ────── */}
      <div className="bg-white w-full h-[150px] md:h-[460px]">
        <div className="xl:flex gap-28 px-4 py-4 md:px-8  lg:px-20 md:py-10">

          <div className="flex flex-col pt-8 gap-1 md:pt-0 md:gap-2 text-[#3b3b3b] font-neogrotesk-ultralight text-[12px] md:text-sm">
            <h1 className="font-neogroteskessalt-light text-[12px] md:text-xs text-[#a0a0a0]">EXPLORE</h1>
            <h1>Shop</h1>
            <h1>Philosophy</h1>
            <h1>Gallery</h1>
            <h1>Journal</h1>
            <h1>Sign Up / Login</h1>
          </div>


          <div className="flex gap-8 pt-10  lg:gap-28 lg:pt-10 xl:pt-0">
         
          <div className="flex flex-col gap-2 text-[#3b3b3b] font-neogrotesk-ultralight text-sm">
            <h1 className="font-neogroteskessalt-light text-xs text-[#a0a0a0]">FOLLOW US</h1>
            <h1>Instagram</h1>
            <h1>Facebook</h1>
          </div>

          <div className="flex flex-col gap-2 text-[#3b3b3b] font-neogrotesk-ultralight text-sm">
            <h1 className="font-neogroteskessalt-light text-xs text-[#a0a0a0]">CONTACT US</h1>
            <a href="mailto:nuvee@gmail.com" className="hover:underline">nuvee@gmail.com</a>
            <span>1111–2222–3333</span>
          </div>
        </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="px-4 py-4  md:px-10 md:py-4 lg:px-20 lg:py-12">
            <img className="h-16 w-24  md:h-14 md:w-28" src="/images/logo.png" alt="Nuvee Logo" />
            <p className="text-[#a0a0a0] text-[10px]">
              Clean, Conscious, Clinical Perfume! <br />
              Honest products that truly work
            </p>
            <p className="text-[#3b3b3b] text-[10px] mt-4">© 2025 Nuvee, All Rights Reserved</p>
          </div>

          <div className="pb-4 md:px-16 md:py-8 flex items-center gap-2">
            <h1 className="text-[#a0a0a0] text-xs md:text-sm">
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
    </main>
  );
}

export default FooterAbove;