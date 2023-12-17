import Button from '@/components/Button'
import 'tailwindcss/tailwind.css'
import { Box, Typography } from '@mui/material'
import Navbar from '../components/Navbar'
import Menu from '@/components/HamburgerMenu'
import TextSection from '@/components/TextSection'
import Footer from '@/components/Footer'
import TopSection from '@/components/TopSection'
import GetStarted from '@/components/GetStarted'
//The home page, which is made up of various components.
export default function Home() {
  return (
    <Box className="flex flex-col text-center h-screen">
        <TopSection title='EZApply' />
        <TextSection title="It's Time to Revolutionize Job Applications!"
         text="Welcome to EZApply! We’re transforming the way people hunt for jobs by streamlining the process. 
         Save your valuable time by using EZApply to fly through job applications!"/>
       
       <GetStarted />
      <Footer />
    </Box>
    
  )
}
