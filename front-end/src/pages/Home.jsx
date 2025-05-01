import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Doctors from './Doctors'
import NEWPAGE from './NEWPAGE'

const Home = () => {
  return (
    <div >
    <Header/>
    <SpecialityMenu/>
    <TopDoctors/>
    <Banner/>
    <Doctors/>
    <NEWPAGE/>
    </div>
  )
}

export default Home

