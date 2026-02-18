

import Link from 'next/link'

export default function NavBar() {
    return (
        <nav className='shadow-lg flex w-full sticky top-0 bg-white z-50'>
            <h1 className = "bg-white text-black px-20 py-4 flex justify-between items-center text-2xl">Sangeeta's Boutique</h1>
            <ul className = "flex items-center mt-4 flex-1">
                <li className='h-full w-32 text-center'>
                    <Link href="#apparel" className="text-black text-xl hover:drop-shadow-sm hover:text-2xl transition-all duration-200 ease-in-out">
                        Apparel
                    </Link>
                </li>

                <li className='h-full w-32 text-center'>
                    <Link href="#about" className="text-black text-xl hover:drop-shadow-sm hover:text-2xl transition-all duration-200 ease-in-out">
                        About
                    </Link>
                </li>

                <li className='h-full w-32 text-center'>
                    <Link href="#accessories" className="text-black text-xl hover:drop-shadow-sm hover:text-2xl transition-all duration-200 ease-in-out">
                        Accessories
                    </Link>
                </li>

                <li className='h-full w-32 text-center ml-auto mr-4'>
                    <Link href="#cart" className="text-black text-xl hover:drop-shadow-sm hover:text-2xl transition-all duration-200 ease-in-out">
                        Cart
                    </Link>
                </li>
            </ul>
        </nav>
    )
}