import React from 'react'
import Image from "next/image";
import * as Images from "../../../utilities/images";
const AddProductModal = () => {
  return (
    <div className='row'>
        <div className='col-lg-4'>
            <Image src={Images.cartImg} alt="img" className="img-fluid"/>
            <Image src={Images.cartShot} alt="img" className="img-fluid mt-3"/>
        </div>
        <div className='col-lg-8'>
            <div className='d-flex justify-content-between'>
                <h1 className='heading28'>JOBR Hoodie</h1>
                <h1 className='heading28'>$980.80</h1>
            </div>  
            <p className='subHeading20'>Color: <span>Grey</span></p>
            <p className='subHeading20'>Size:  <span>X</span></p>
            <div className='counter'>
                <span className='minus'><i className="fas fa-minus"></i></span>
                <span className='counting'> 1 </span>
                <span className='plus'><i className="fas fa-plus"></i></span>
            </div>
            <div className="separator">
                <div className="line"></div>
                <h2>Colors</h2>
                <div className="line"></div>
            </div>
            <div className='colorBtn'>
                <button className='selectBtn active'>Grey</button>
                <button className='selectBtn'>Blue</button>
                <button className='selectBtn'>Black</button>
                <button className='selectBtn'>White</button>
            </div>
            <div className="separator">
                <div className="line"></div>
                <h2>size</h2>
                <div className="line"></div>
            </div>
            <div className='colorBtn'>
                <button className='selectBtn active'>XS</button>
                <button className='selectBtn'>M</button>
                <button className='selectBtn'>L</button>
                <button className='selectBtn'>X</button>
                <button className='selectBtn'>XL</button>
                <button className='selectBtn'>XXL</button>
            </div>
        </div>
    </div>
  )
}

export default AddProductModal