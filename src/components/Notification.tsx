import { Bell } from 'lucide-react'
import React from 'react'

type Props = {}

function Notification({}: Props) {
  return (
    <div className='rounded-md duration-150 cursor-pointer hover:bg-gray-200 text-slate-700 p-2'><Bell size={19} /></div>
  )
}

export default Notification