import {useGSAP } from "@gsap/react"
import gsap from "gsap";
import ArrowCurve from "./icons/arrow";

function Landing() {
    useGSAP(()=>{
        gsap.fromTo('#meet',{  y : 30, opacity : '0%'},{  opacity : '100%',  y: '0%', delay :0.4, ease : 'circ.in'   })
        gsap.fromTo('#our',{  y : 30, opacity : '0%'},{  opacity : '100%',  y: '0%', delay :0.6, ease : 'circ.in'   })

        gsap.fromTo('#box',{  y : 30, opacity : '0%'},{  opacity : '100%',  y: '0%', delay :0.6, ease : 'circ.in'   })
        gsap.fromTo('#box-heading',{  y : 30, opacity : '0%'},{  opacity : '100%',  y: '0%', delay :0.7, ease : 'back.in'   })
        gsap.fromTo('#box-text',{  y : 30, opacity : '0%'},{  opacity : '100%',  y: '0%', delay :0.8, ease : 'back.in'   })
        gsap.fromTo('#box-button',{  y : 30, opacity : '0%'},{  opacity : '100%',  y: '0%', delay :0.9, ease : 'back.in'   })

        gsap.fromTo('#complete',{  y : 30, opacity : '0%'},{  opacity : '100%',  y: '0%', delay :1, ease : 'circ.in'   })
        gsap.fromTo('#fragrance',{  y : 30, opacity : '0%'},{  opacity : '100%',  y: '0%', delay :1.2, ease : 'circ.in'   })
        gsap.fromTo('#lineup',{  y : 30, opacity : '0%'},{  opacity : '100%',  y: '0%', delay :1.3, ease : 'circ.in'   })

          
    },[])
    return (
        <div className="h-screen w-screen pt-20 bg-nuvee-gradient">
            {/* <div  className="bg-amber-300 h-10 w-10"></div> */}
            <div className="relative h-full w-full ">

                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-0  img-fade-top  ">
                    <img className="h-[500px] img-fade-right " src="./public/images/hero1.png" alt="" />
                </div>

                <div className="absolute top-16 left-110">
                    <ArrowCurve/>
                </div>

                <div className="absolute top-20 left-26">
                    <h1  className="text-6xl font-neogrotesk-sc-bold text-primary flex col"><div id="meet">MEET</div> <div id="our" className="pl-2"> OUR</div></h1>
                </div>
                <div id="" className="absolute right-20 bottom-15">
                    <h1 className="text-7xl font-ITCGaramondStd-BkCondIta text-primary"> <span id="complete">complete</span> <br /> <span className="pl-20" id="fragrance" >fragrance</span> <br /><span className="pl-40" id="lineup">lineup</span><br /> </h1>
                </div>

                <div id="box" className="absolute left-24 bottom-20 bg-secondary rounded-4xl  h-[340px] w-[300px] ">
                    <div className="px-8 py-6">
                        <h1 id="box-heading" className=" text-4xl text-primary"><span className="font-neogrotesk-regular">UnderStand</span><br /><span className="font-neogrotesk-regular">Your</span><span className="font-ITCGaramondStd-BkCondIta"> Essence</span></h1>
                    </div>
                    <div  className="pl-8">
                        <h1 id="box-text" className="font-neogroteskessalt-light text-[12px] text-light">
                            Fragrance is not just about the scent  you <br />
                            wear, it’s about the story it tells. Discover <br />
                            how Nuvée perfumes elevate your mood,<br />
                            confidence, and presence. Explore the <br />
                            full collection and find the scent that <br />
                            truly defines you.</h1>
                    </div>
                    <div id="box-button" className="mx-8 my-4 h-[45px] w-[241px] bg-primary flex justify-center items-center rounded-4xl">
                        <h1  className="font-neogroteskessalt-light text-secondary text-xs ">EXPLORE NOW</h1>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Landing;