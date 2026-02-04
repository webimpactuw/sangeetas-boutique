

import Link from 'next/link'

export default function NavBar() {
    return (
        <nav className='shadow-lg flex w-full sticky top-0 bg-white z-50'>
            <h1 className = "bg-white text-black px-20 py-4 flex justify-between items-center text-2xl">Sangeeta's Boutique</h1>
            <ul className = "flex items-center mt-4">
                <li className='h-full w-40'>
                    <Link href="#collection" className="text-black  text-xl">
                        Collection
                    </Link>
                </li>

                <li className='h-full w-32'>
                    <Link href="#gallery" className="text-black  text-xl">
                        Gallery
                    </Link>
                </li>

                <li className='h-full w-32'>
                    <Link href="#about" className="text-black  text-xl">
                        About
                    </Link>
                </li>

                <li className='h-full w-32'>
                    <Link href="#contacts" className="text-black  text-xl">
                        Contacts
                    </Link>
                </li>
            </ul>
        </nav>
    )
}