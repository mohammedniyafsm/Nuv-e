import Input from './ui/Input';
import { ArrowIcon } from './icons/ArrowIcon';
import Git from './icons/Git';

function FooterAbove() {
  return (
    <main>
      {/* ────── Background Section ────── */}
      <div className="relative bg-[url('./public/images/1k.jpg')] bg-cover bg-[center_50%] h-[900px] w-full">
        <div className="absolute py-20 bg-[#232323] h-[750px] w-[550px] top-[300px] right-20 bottom-0 z-0">

          {/* Headline */}
          <div className="font-neogrotesk-bold text-center text-6xl text-secondary">
            <h1>HEAR MORE</h1>
            <h1>FROM US</h1>
          </div>

          {/* Subtext */}
          <div className="text-center text-[rgba(172,163,163,0.93)] py-6">
            <p>Get the latest news about Perfumes</p>
            <p>tips and new products</p>
          </div>

          {/* Email Input */}
          <div className="flex justify-center mt-10 px-16">
            <Input
              className="w-[450px] h-1 text-xs text-[rgba(172,163,163,0.93)]"
              type="text"
              placeholder="ENTER YOUR EMAIL"
            />
          </div>

          {/* Subscribe Button */}
          <div className="flex justify-center pt-16">
            <div className="flex flex-col items-center gap-2">
              <button className="bg-[#787878] h-20 w-20 rounded-full flex justify-center items-center">
                <ArrowIcon className="text-white h-6 w-6" />
              </button>
              <h1 className="text-[rgba(172,163,163,0.93)] font-neogrotesk-ultralight text-xs underline">
                SUBSCRIBE
              </h1>
            </div>
          </div>

          {/* Divider */}
          <div className="px-10 pt-10">
            <hr className="border-[#787878]" />
          </div>

          {/* Disclaimer */}
          <div className="text-center font-neogrotesk-ultralight text-[rgba(138,122,122,0.93)] py-6 text-[10px] pt-16">
            <p>No Spam, only quality articles to help you be</p>
            <p>more radiant. You can opt out anytime.</p>
          </div>
        </div>
      </div>

      {/* ────── Footer Section ────── */}
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
    </main>
  );
}

export default FooterAbove;