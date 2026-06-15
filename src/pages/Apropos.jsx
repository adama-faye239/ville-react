import React from 'react'
import './apropos.css'
import mbour from '../assets/mbour.jpg'
import mbours from '../assets/mbours.jpg'
import mbour2 from '../assets/mbour2.jpg'
export const Apropos = () => {
  return (
    <div>
        <h2>Bienvenu dans la commune de mbour</h2>
        <div  className='apropos'>
            <img src={mbour} alt="mbour" />
            <img src={mbours} alt="mbours1" />
            <img src={mbour2} alt="mbour2" />
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ullam, voluptate <br />
         doloremque assumenda sunt laboriosam, deleniti quibusdam sint fugit <br /> architecto voluptas laborum adipisci in minima accusamus! Cupiditate <br />
          voluptate laborum aliquam!</p>
          
          <div className='second'>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Quam ullam, voluptate <br />
         doloremque assumenda sunt laboriosam, deleniti quibusdam 
            </p>
            
                <img src={mbour} alt="mbour" />
            
          </div>
    </div>
  )
}

