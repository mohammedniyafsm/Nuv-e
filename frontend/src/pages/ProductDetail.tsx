import Navbar from '../components/Navbar'
import Bag from '../components/icons/bag'
import Return30 from '../components/icons/Return30'
import Bus from '../components/icons/Bus'
import Leaf from '../components/icons/Leaf'
import Package from '../components/icons/Package'
import AsteriskStar from '../components/icons/Star'
import MedallionIcon from '../components/icons/Sun'
import Antioxide from '../components/icons/antioxide'
import Exfoliating from '../components/icons/Exfoliating'
import FooterAbove from '../components/FooterAbove'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { type AppDispatch } from '../app/store'
import { addCart, Carts } from '../features/Cart/CartSlice'
import toast from 'react-hot-toast'

interface Product {
    _id: string;
    name: string;
    brand: string;
    category: string;
    description: string;
    price: number;
    discount: number;
    size: string;
    status: string;
    stock: number;
    images: { url: string }[];
    createdAt: string;
    updatedAt: string;
}

function ProductDetail() {
    const [product, setProduct] = useState<Product | null>(null);
    const { id } = useParams<{ id: string }>();
    const [currentQuantity, setQuantity] = useState(1);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(Carts());
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Failed to fetch product:", error);
            }
        };
        if (id) fetchProductDetail();
    }, [id, dispatch]);

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => { if (currentQuantity > 1) setQuantity(prev => prev - 1); };
    const addToCart = () => {
        if (!product) return;
        dispatch(addCart({ productId: product._id, quantity: currentQuantity, price: Number(product.price) }));
        toast.success("Product Added to Cart");
    };

    const categoryBg: Record<string, string> = {
        "SIGNATURE COLLECTION": "#EDCACA",
        "BLOOM ESSENCE": "#CBC6D8",
        "NOIR COLLECTION" : "#F2D6AF"
    };

    const name = product?.name ?? "";
    const [part1, part2, part3] = name.split(' ').reduce((acc, word, i) => {
        if (i < 2) acc[0] += word + ' ';
        else if (i < 4) acc[1] += word + ' ';
        else acc[2] += word + ' ';
        return acc;
    }, ["", "", ""]);

    const bgColor = product ? categoryBg[product.category] || "#FFFFFF" : "#FFFFFF";

    return (
        <div className='w-screen h-screen' style={{ backgroundColor: bgColor }}>
            <Navbar />

            {/* HERO SECTION - UNTOUCHED */}
            <div className="flex pt-20 lg:pt-34 justify-between flex-col lg:flex-row">
                <div className="pl-6 lg:pl-44 pt-6 lg:pt-10 flex justify-center lg:justify-start">
                    <img className='h-80 lg:h-100 w-auto' src= { product?.images[0].url || "./images/product1.png"} alt="" />
                </div>

                <div className="bg-[#F2F2F2] w-full lg:w-[700px] lg:h-[800px] px-6 lg:px-20 py-6 lg:py-10 mt-6 lg:mt-0">
                    <div className="bg-[#F2F2F2] border h-[29px] w-[130px] rounded-[40px] flex justify-center items-center mt-1">
                        <h1 className='text-gray-600 font-neogroteskessalt-light text-[8px]'>{product?.category}</h1>
                    </div>
                    <h1 className='text-[#3B3B3B] text-3xl lg:text-5xl py-4 lg:py-6 font-neogrotesk-bold leading-tight lg:leading-14'>
                        <div>{part1.trim()}</div>
                        <div>{part2.trim()}</div>
                        <div>{part3.trim()}</div>
                    </h1>
                    <div className="pl-1.5 flex items-center flex-wrap gap-3">
                        <div className="bg-[#2E2E2E] h-7 w-22 rounded-4xl flex justify-center items-center">
                            <h1 className='text-[11px] text-white font-neogroteskessalt-light'>{product?.size.toUpperCase()}</h1>
                        </div>
                        <h1 className="text-[#2E2E2E] text-base lg:text-md font-neogroteskessalt-light">
                            <span className="font-sans">₹</span>{product?.price}
                        </h1>
                    </div>
                    <div className="pl-1.5 pt-6 lg:pt-8">
                        <h1 className='font-neogroteskessalt-light text-sm text-[#9C8080] leading-5'>{product?.description}</h1>
                    </div>
                    <div className="pl-4 pt-10 lg:pt-12 flex items-center flex-wrap gap-3">
                        <h1 className='font-neogroteskessalt-light text-[#2E2E2E]'>QTY</h1>
                        <div className="flex gap-3 lg:gap-4 items-center pl-2 lg:pl-4">
                            <div onClick={decrementQuantity} className="h-7 w-7 bg-[#D9D9D9] flex justify-center items-center rounded-full cursor-pointer">-</div>
                            <h1 className='font-neogroteskessalt-light w-8 text-center'>{currentQuantity}</h1>
                            <div onClick={incrementQuantity} className="h-7 w-7 bg-[#D9D9D9] flex justify-center items-center rounded-full cursor-pointer">+</div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: bgColor }} className="h-14 lg:h-16 w-full lg:w-[550px] rounded-4xl mt-8 lg:mt-10 flex items-center justify-center lg:justify-start px-4 lg:px-0">
                        <h1 onClick={addToCart} className='font-neogroteskessalt-light text-sm cursor-pointer underline text-white pl-0 lg:pl-56 text-center lg:text-left'>ADD TO CART</h1>
                        <div className="bg-[#F2F2F2] h-10 w-10 rounded-full flex justify-center items-center ml-4 lg:ml-46">
                            <Bag className='h-7 w-7 text-[#D4969B]' />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 lg:flex lg:justify-between py-12 lg:py-20 px-2 gap-4">
                        {[
                            { Icon: Return30, lines: ["30 Days", "Return"] },
                            { Icon: Bus, lines: ["Free", "Shipping"] },
                            { Icon: Leaf, lines: ["Vegan &", "Cruelty Free"] },
                            { Icon: Package, lines: ["Kind to planet", "Packaging"] },
                        ].map(({ Icon, lines }, i) => (
                            <div key={i} className="text-center text-xs">
                                <div className="h-12 w-12 bg-white rounded-full flex justify-center items-center mx-auto">
                                    <Icon />
                                </div>
                                <div className="py-2 lg:py-4 space-y-0">
                                    {lines.map(line => <h1 key={line}>{line}</h1>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MIDDLE SECTION - FINAL, NO BG, PIXEL-PERFECT */}
            <div className="relative lg:h-[1500px] h-auto overflow-hidden">
                <div className="absolute left-4 top-20 lg:left-0 lg:top-20 z-10">
                    <img className="h-64 hidden sm:block lg:h-96 w-auto" src= { product?.images[2]?.url || "./images/product1.png"} alt="" />
                </div>
                <div className="relative z-20 flex justify-center pt-32 lg:pt-[500px] px-4 lg:px-0">
                    <div className="flex flex-col items-center text-center max-w-4xl">
                        <AsteriskStar className="h-10 w-10 lg:h-auto lg:w-auto text-primary" />
                        <div className="text-3xl lg:text-6xl text-center py-10 lg:py-20 font-neogrotesk-regular text-primary leading-tight">
                            <h1>A burst of botanical mist</h1>
                            <h1>reviving <span className='font-ITCGaramondStd-BkIta'>clarity</span> for dim, worn</h1>
                            <h1>and weary senses.</h1>
                        </div>
                    </div>
                </div>
                <div className="relative z-20 flex flex-col lg:flex-row px-6 lg:px-20 py-10 lg:py-16 gap-8 lg:gap-12 mt-10 lg:mt-0">
                    <div className="flex flex-col gap-2 text-[#3b3b3b] font-neogrotesk-ultralight text-sm">
                        <h1 className="font-neogroteskessalt-light text-xs text-[#786e6e]">RECOMMENDED FOR</h1>
                        <ul className="list-disc pl-5 text-xs space-y-1">
                            <li>Faded moods</li>
                            <li>Lingering heaviness</li>
                            <li>Unbalanced energy</li>
                            <li>Overwhelm</li>
                            <li>Sensory fatigue</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2 text-[#3b3b3b] font-neogrotesk-ultralight text-sm">
                        <h1 className="font-neogroteskessalt-light text-xs text-[#786e6e]">GOOD TO KNOW</h1>
                        <ul className="list-disc pl-5 text-xs space-y-1">
                            <li>pH-balanced harmony</li>
                            <li>Crafted with clean botanicals</li>
                            <li>Vegan, cruelty-free elegance</li>
                            <li>No synthetic dyes added</li>
                            <li>Suitable for all temperaments</li>
                        </ul>
                    </div>
                <div className="absolute right-4 top-32 lg:right-0 lg:bottom-12 z-10">
                    <img className="h-64 hidden sm:block lg:h-96 w-auto" src= { product?.images[1]?.url || "./images/product1.png"} alt="" />
                </div>
                </div>
                
            </div>

            {/* BOTTOM SECTION - UNTOUCHED */}
            <div className="bg-[#f5f5f5] h-auto lg:h-[1100px] py-20 lg:py-0">
                <div className="flex flex-col items-center text-4xl lg:text-6xl text-primary pt-20 lg:pt-42">
                    <p className='font-ITCGaramondStd-BkIta'>all about the</p>
                    <h1 className='font-neogrotesk-bold'>PRODUCT</h1>
                </div>
                <div className="flex flex-col lg:flex-row pt-20 lg:pt-32 gap-8 lg:gap-0 px-6 lg:px-0">
                    <div className="px-6 lg:px-18 flex justify-center">
                        <img className='h-80 lg:h-[600px] w-auto lg:w-[500px]' src= { product?.images[3]?.url || "./images/product1.png"} alt="" />
                    </div>
                    <div className="px-6 lg:px-20 flex-1">
                        <div className="pt-10 lg:pt-16">
                            <h1 className='text-xs font-neogroteskessalt-light text-[#787878]'>ABOUT THE PRODUCT</h1>
                            <h1 className='text-sm lg:text-md text-[#424242] font-neogrotesk-bold pt-2 lg:pt-4 leading-relaxed'>
                                A boost of antioxidant-rich aromatic renewal for dull,<br /> dry, and tired senses, this super-absorbable essence helps<br /> clear emotional heaviness and energetic blemishes while<br /> revealing a brighter, more balanced aura.
                            </h1>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 py-8 lg:py-10">
                            <div className="flex flex-col gap-2 text-[#3b3b3b] font-neogrotesk-ultralight text-sm">
                                <h1 className="font-neogroteskessalt-light text-xs text-[#786e6e]">RECOMMENDED FOR</h1>
                                <ul className="list-disc pl-5 text-xs font-neogrotesk-bold space-y-1">
                                    <li>Dull aura</li>
                                    <li>Lingering pigmentation of mood</li>
                                    <li>Uneven emotional tone</li>
                                    <li>Excess energetic buildup</li>
                                    <li>Overexposed sensory pathways</li>
                                </ul>
                            </div>
                            <div className="flex flex-col gap-2 text-[#3b3b3b] font-neogrotesk-ultralight text-sm">
                                <h1 className="font-neogroteskessalt-light text-xs text-[#786e6e]">SUITABLE FOR</h1>
                                <ul className="list-disc pl-4 text-xs font-neogrotesk-bold space-y-1">
                                    <li>Unisex fragrance rituals for all temperaments</li>
                                    <li>Safe for expectant moments and sensitive transitions</li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 lg:flex lg:gap-14 pt-8 lg:pt-10 justify-center lg:justify-start">
                            {[
                                { Icon: MedallionIcon, label: "Skin Brightening" },
                                { Icon: Leaf, label: "Deep Cleanse" },
                                { Icon: Antioxide, label: "Anti-Oxidant" },
                                { Icon: Exfoliating, label: "Exfoliating" },
                            ].map(({ Icon, label }, i) => (
                                <div key={i} className="flex flex-col items-center gap-3 lg:gap-4">
                                    <div className="h-14 w-14 lg:h-16 lg:w-16 rounded-full bg-white flex justify-center items-center">
                                        <Icon />
                                    </div>
                                    <h1 className='text-xs text-[#3b3b3b] font-neogrotesk-regular text-center'>{label}</h1>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <FooterAbove />
        </div>
    );
}

export default ProductDetail;