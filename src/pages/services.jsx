import React from 'react'
import mbour from '../assets/mbour.jpg'

export const Services = () => {
  return (
    <div>
        <h2>Nos differents services</h2>
        <div className='cards'>
           <secton className='card'>
 <h3>Commune de thies</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, <br />
            soluta accusamus voluptatem cupiditate aperiam recusandae quam eum
             </p>
             <img src={mbour} alt="mbour" />
             <button>Voir plus</button>
           </secton>

           <secton className='card'>
 <h3>Commune de thies</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, <br />
            soluta accusamus voluptatem cupiditate aperiam recusandae quam eum
             </p>
             <img src={mbour} alt="mbour" />
             <button>Voir plus</button>
            </secton>

            <secton className='card'>
 <h3>Commune de thies</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, <br />
            soluta accusamus voluptatem cupiditate aperiam recusandae quam eum
             </p>
             <img src={mbour} alt="mbour" />
             <button>Voir plus</button>
            </secton> 
        </div>

    </div>
  )
}


