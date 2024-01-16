import React from 'react'

const Page404 = () => {
  return (
    <div style={{ position: "relative", backdropFilter: "blur(30px)", height: '100vh' }}>
            <div className='container-fluid p-5' >
                <div className='container p-5'>
                    <div className='m-5 '></div>
                    <div className='d-flex text-center  pt-5 justify-content-center flex-column align-items-center  m-0' >
                        <div className='' style={{ backgroundImage:  `url(${require('../../images/404.png')})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'background-image 5s ease-in-out', height: '220px' ,  width: '220px'}}>
                        </div>
                        <div className='p-5'><h1>  נראה שהדף שחיפשת לא נמצא</h1></div>
                        
                      
                    </div>
                </div>

            </div>
        </div>
  )
}

export default Page404