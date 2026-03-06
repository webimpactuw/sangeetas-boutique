import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-navy py-5 px-6 md:px-10">
      {/* Mobile layout: stacked centered */}
      <div className="flex flex-col items-center gap-4 md:hidden">
        <div className="font-cardo text-white text-sm text-center">
          <p>Sanji@gmail.com</p>
          <p>425-862-8572</p>
        </div>
        <div className="flex items-center gap-5">
          <Image src="/images/social-instagram.png" alt="Instagram" width={26} height={26} className="object-contain cursor-pointer hover:opacity-80 transition-opacity" />
          <Image src="/images/social-facebook.png" alt="Facebook" width={25} height={25} className="object-contain cursor-pointer hover:opacity-80 transition-opacity" />
          <Image src="/images/social-whatsapp.png" alt="WhatsApp" width={26} height={26} className="object-contain cursor-pointer hover:opacity-80 transition-opacity" />
        </div>
      </div>

      {/* Desktop layout: row with space-between */}
      <div className="hidden md:flex items-center justify-between">
        <p className="font-cardo text-white text-xl">
          Sanji@gmail.com &nbsp;&nbsp;&nbsp;&nbsp; 425-862-8572
        </p>
        <div className="flex items-center gap-4">
          <Image src="/images/social-instagram.png" alt="Instagram" width={30} height={30} className="object-contain cursor-pointer hover:opacity-80 transition-opacity" />
          <Image src="/images/social-facebook.png" alt="Facebook" width={30} height={30} className="object-contain cursor-pointer hover:opacity-80 transition-opacity" />
          <Image src="/images/social-whatsapp.png" alt="WhatsApp" width={30} height={30} className="object-contain cursor-pointer hover:opacity-80 transition-opacity" />
        </div>
      </div>
    </footer>
  )
}
