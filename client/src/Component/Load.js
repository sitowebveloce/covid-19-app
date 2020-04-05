import React from 'react'
import {ReactComponent as Svg } from './virus.svg'
import './Load.css'

export default function Loader() {
    return (
        <div className='covid-loader'>
         <Svg className='vir-svg'/>
        </div>
    )
}
