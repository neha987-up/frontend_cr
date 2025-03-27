import React, { useEffect } from 'react'
import * as Images from "../../utilities/images";
import Image from "next/image";
const SuccessfulModal = (props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.details("LoginProfile")
      props.details("productAdded")
    }, 2000);
    return () => clearTimeout(timer);
  }, [])
  
  return (
    <div className='SuccessfulModal'>
        <Image src={Images.checkedSuccess} alt='Success' className='checkedSucc mt-5 mb-5'/>
        <h4 className='mainBoldHeading'>Successful</h4>
        <span className='innerSubhead'>{props.flag == 'productsAdded' ? 'Products Added to your shop' : 'You have created your business here'}</span>
    </div>
  )
}

export default SuccessfulModal