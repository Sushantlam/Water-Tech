'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {

    const router = useRouter()
    const user = localStorage.getItem('userName')
   const userData = user? JSON.parse(user): null
    useEffect(() => {
       if(!userData){
        router.push('login')
       }
      }, [userData, router])
      
  return (
    <div>page</div>
  )
}

export default page