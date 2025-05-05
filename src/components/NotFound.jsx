import React from 'react'
import notFound from '/img/not-found.jpg'

const NotFound = () => {
  return (
    <div className='container' style={{height:"100vh"}}>
      <div className="row justify-content-center align-items-center">
        <div className="col-12 text-center">
          <img src={notFound} alt="پیج مورد نظر شما یافت نشد" width="100%"/>
          <h3>پیج مورد نظر شما یافت نشد!</h3>
        </div>
      </div>
      
    </div>
  )
}

export default NotFound
