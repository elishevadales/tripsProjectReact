import React from 'react'
const SignUpMessage = () => {

    return (

        <div style={{ position: "relative", backdropFilter: "blur(30px)", height: '100vh' }}>
            <div className='container-fluid p-5' >
                <div className='container p-5 d-flex text-center justify-content-center flex-column align-items-center'>
                    <div className='d-flex text-center p-5 justify-content-center flex-column align-items-center mt-5 ' style={{ background: 'white' , maxWidth:'500px', borderRadius:'10px'}}>
                        <h2>Trip With Me</h2>
                        <h3> תודה על הרשמתך  </h3>
                        <p className='h4 pt-3' style={{maxWidth:'300px'}}> כדי להמשיך, עליך לאשר את הרשמתך בהודעה שנשלחה לדואר האלקטרוני שלך</p>
                        <div className='col  me-3 p-5' style={{ backgroundImage:  `url(${require('../../images/email.gif')})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'background-image 5s ease-in-out', height: '90px' ,  width: '90px'}}>
                       </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SignUpMessage