"use client"
import { Bell } from 'lucide-react'
import React from 'react'
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from '@novu/notification-center';

type Props = {}

function Notification({ }: Props) {
  return (
    <>
      <NovuProvider subscriberId={'on-boarding-subscriber-id-123'} applicationIdentifier={'pLogpHM-zWyO'}>
        <PopoverNotificationCenter colorScheme={'light'}>
          {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
        </PopoverNotificationCenter>
      </NovuProvider>
      <div className='rounded-md duration-150 cursor-pointer hover:bg-gray-200 text-slate-700 p-2'><Bell size={19} /></div>
    </>
  )
}

export default Notification