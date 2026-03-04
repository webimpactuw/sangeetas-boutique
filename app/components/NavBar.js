import Link from 'next/link'

export default function NavBar() {
    return (
        <nav className='shadow-lg flex w-full sticky top-0 bg-white z-50'>
            <div className="bg-white text-black px-6 py-4 flex items-center">
                <Link href="/">
                    <img src="/whitelogo.png" alt="Sangeeta's Boutique logo" className="h-10" />
                </Link>
            </div>
            <ul className = "flex items-center justify-end flex-1 mt-4">
                <li className='h-full w-32 text-center'>
                    <Link href="#apparel" className="text-black text-xl hover:drop-shadow-sm hover:text-2xl transition-all duration-200 ease-in-out">
                        Apparel
                    </Link>
                </li>

                <li className='h-full w-32 text-center'>
                    <Link href="#accessories" className="text-black text-xl hover:drop-shadow-sm hover:text-2xl transition-all duration-200 ease-in-out">
                        Accessories
                    </Link>
                </li>
                
                <li className='h-full w-32 text-center'>
                    <Link href="#about" className="text-black text-xl hover:drop-shadow-sm hover:text-2xl transition-all duration-200 ease-in-out">
                        About
                    </Link>
                </li>

                <li className='h-full w-32 text-center mr-4'>
                    <Link href="#cart" className="text-black text-xl hover:drop-shadow-sm hover:text-2xl transition-all duration-200 ease-in-out">
                        Cart
                    </Link>
                </li>
            </ul>
        </nav>
    )
}