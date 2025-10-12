import {useGSAP } from "@gsap/react"
import gsap from "gsap";
import ArrowCurve from "./icons/arrow";

function Landing() {
    useGSAP(()=>{
        gsap.from('#mainn h1',{  y : 30, opacity : 0,stagger : 1})

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
            <div className="relative h-full w-full ">

                <div className="absolute bottom-0 md:left-1/2 md:-translate-x-1/2 z-0  img-fade-top  ">
                    <img className=" h-[500px] img-fade-right " src="./public/images/hero1.png" alt="" />
                </div>

                <div className="hidden md:block absolute top-16 left-110">
                    <ArrowCurve/>
                </div>

                <div className="absolute top-8 left-6 md:top-20 md:left-26 ">
                    <div id="mainn"  className="text-4xl md:text-6xl font-neogrotesk-sc-bold text-primary flex col">
                        <h1 >MEET</h1>
                        <h1 className="pl-2"> OUR</h1>
                    </div>
                </div>
                <div id="" className="absolute right-3 md:right-20 bottom-10">
                    <h1 className="text-3xl md:text-7xl font-ITCGaramondStd-BkCondIta text-primary"> <span id="complete">complete</span> <br /> <span className="pl-6 md:pl-20" id="fragrance" >fragrance</span> <br /><span className="pl-16 md:pl-40" id="lineup">lineup</span><br /> </h1>
                </div>

                <div id="box" className="hidden md:block absolute left-24 bottom-20 bg-secondary rounded-4xl  h-[340px] w-[300px] ">
                    <div className="px-8 py-6">
                        <h1 id="box-heading" className=" text-4xl text-primary"><span className="font-neogrotesk-regular">UnderStand</span><br /><span className="font-neogrotesk-regular">Your</span><span className="font-ITCGaramondStd-BkCondIta"> Essence</span></h1>
                    </div>
                    <div  className="">
                        <h1 id="box-text" className="font-neogroteskessalt-light text-[12px] pl-8 text-light">
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