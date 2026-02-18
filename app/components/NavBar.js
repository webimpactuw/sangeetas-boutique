import Link from 'next/link'

export default function NavBar() {
    return (
        <nav className='shadow-lg flex w-full sticky top-0 bg-white z-50 p-r pl-6'>

            <ul className = "flex items-center mt-4">
                <li className = 'h-full w-60'>
                    <Link href="/" className="text-black text-xl hover:cursor-pointer">
                        Sangeeta's Boutique
                    </Link>
                </li>

                <li className='h-full w-32'>
                    <Link href="/apparel" className="text-black text-xl hover:drop-shadow-sm hover:text-2xl transition-all duration-200 ease-in-out">
                        Apparel
                    </Link>
                </li>

                <li className='h-full w-32'>
                    <Link href="/accessories" className="text-black text-xl hover:drop-shadow-sm hover:text-2xl transition-all duration-200 ease-in-out">
                        Accessories
                    </Link>
                </li>

                <li className='h-full w-32'>
                    <Link href="/contacts" className="text-black text-xl hover:drop-shadow-sm hover:text-2xl transition-all duration-200 ease-in-out">
                        Contact
                    </Link>
                </li>

                <li className='h-full w-32'>
                    <Link href="/about" className="text-black text-xl hover:drop-shadow-sm hover:text-2xl transition-all duration-200 ease-in-out">
                        About
                    </Link>
                </li>

                
                <li className='h-full w-32'>
                    <Link href="/cart" className="text-black text-xl hover:drop-shadow-sm hover:text-2xl transition-all duration-200 ease-in-out">
                        Cart 
                    </Link>
                </li>               
            </ul>
        </nav>
    )
}