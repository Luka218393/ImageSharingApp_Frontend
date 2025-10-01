import React, { useState } from 'react'

export const Navbar: React.FC = () => {

  let [selectedPage, setSelectedPage] = useState<string>("Gallery")

  return (
    <nav className='w-fill h-fit p-6 bg-purple-800 sticky top-0 z-50 flex flex-row '>
        <h2 className='text-4xl text-white fugaz-one-regular' style={{ fontFamily: 'Fugaz One' }}>
            ImageSharingApp
        </h2>
    </nav>
  )
}
