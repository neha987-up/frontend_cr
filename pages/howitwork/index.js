import React from 'react'
import Image from 'next/image';
import * as images from './../../utilities/images';
const Index = () => {
  return (
   <section className='howitworks'>
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12'>
          <h3 className='fontSize24'><strong>How it Works</strong></h3>
          <p className='fontSize16 mb-4'>Collection Rewards is a fun platform for creating digital collections to share with friends, and winning cool prizes in the process.</p>
        </div>
      </div>
      <div className='row howitworkFirst mb-4'>
        <div className='col-md-4 mb-3 mb-md-0 text-center'>
          <Image src={images.howitworkfirst} alt='image' className='img-fluid'/>
        </div>
        <div className='col-md-8'>
          <p className='fontSize16'>We offer two types of tokens, Collectable Tokens and one ‘Anchor’ Promotional Token. You will need both to fully complete a collection. Collectable tokens are available for purchase on a rotating basis so make sure to check back regularly to ensure you don’t miss the chance to complete a collection.</p>
        </div>
      </div>
      <div className='row howitworkFirst mb-4'>
        <div className='col-md-8 mb-3 mb-md-0 '>
          <p className='fontSize16'>There is only one Promotional Token per collection, and they are tiered, with each version more exclusive than the next. Promotional tokens may also be linked to a giveaway, meaning that if you have it in your collection, you’ll be entered into a draw for awesome prizes completely for FREE! Remember, you can always buy more than one, or upgrade your existing tier to increase your chances of winning. These tokens are only available for a limited time and once they’re gone, they’re gone, so be sure to act fast if you see one to avoid missing out.</p>
          <p className='fontSize16'>Once you purchase a token, be sure to check your inventory and “My Giveaways” to see your new token and any giveaway entries you have obtained.</p>
        </div>
        <div className='col-md-4 text-center'>
          <Image src={images.howitworksecond} alt='image' className='img-fluid'/>
        </div>
      </div>
    </div>
   </section>
  )
}

export default Index;