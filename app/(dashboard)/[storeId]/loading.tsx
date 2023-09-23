import { Loader, Loader2Icon } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>Loading<Loader2Icon className='animate-spin'/></div>
  )
}

export default Loading