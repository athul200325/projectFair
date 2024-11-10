import React, { createContext, useEffect, useState } from 'react'
export const tokenAuthContex= createContext()

const AuthContextAPI = ({children}) => {
    const [isAutherized,setIsAutherized]=useState(false)

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsAutherized(true)
        }else{
            setIsAutherized(false)
        }
    },[isAutherized])

  return (
    <tokenAuthContex.Provider value={{isAutherized,setIsAutherized}}>
    {children}
    </tokenAuthContex.Provider>
  )
}

export default AuthContextAPI