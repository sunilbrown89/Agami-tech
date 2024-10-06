import React from 'react'
import Signup from './Signup'
import SignIn from './SignIn'

const SignupSigninForm = () => {
  return (
    <div className="grid gid-rows-2 lg:grid-cols-2 gap-2 justify-center items-center h-screen w-full bg-cover bg-center"
    style={{
        backgroundImage: `url("https://img.freepik.com/free-photo/office-table-with-cup-coffee-keyboard-notepad_1220-4617.jpg")`,
      }}
    >    
        <SignIn/>
        <Signup />
    </div>
  )
}

export default SignupSigninForm