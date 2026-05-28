"use client"


import dynamic from 'next/dynamic'


const HelpButton = dynamic(() => import('./HelpButton'), { ssr: false })


export default function HelpButtonWrapper(props) {
 return <HelpButton {...props} />
}
