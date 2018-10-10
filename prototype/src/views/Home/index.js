import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'

export default function (){
  return (
    <div className="HomeView">Hejhej på mig, jag är långsammast <Link to="/About">About</Link></div>
  )
}
