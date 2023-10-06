import Image from 'next/image'
import { FC } from 'react'
import { Switch } from '../ui/switch'
import { Button } from '../ui/button'
import drCashLogo from '@/public/integrations/dr-cash.png'
import { Separator } from '../ui/separator'
interface IntegrationProps {

}

export const Integration: FC<IntegrationProps> = ({ }) => {
    return (
        <div className='px-4 py-6'>
            <h3 className='text-2xl font-medium text-black mb-5'>Apps Integrations</h3>
            <div className='grid grid-cols-3 gap-4 '>
                {
                    [0, 1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="border-gray-200 rounded-sm border">
                            <div className="card-body p-0">
                                <div className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <span className="avatar avatar-rounded avatar-md bg-transparent dark:bg-transparent">
                                                <Image src={drCashLogo.src} alt="Affilate Network Logo" width={60} height={60} className='w-10 h-10 object-cover' />
                                            </span>
                                            <div className="ltr:ml-2 rtl:mr-2">
                                                <h6 className='text-[20px] font-semibold text-gray-500'>Dr Cash</h6>
                                            </div>
                                        </div>
                                        <Switch id="airplane-mode" />
                                    </div>
                                    <p className="mt-6">Upload your files to Google Drive</p>
                                </div>
                            </div>
                            <Separator />
                            <div className="card-footer  p-2 flex justify-end my-4">
                                <Button variant="outline">View Intergration</Button>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

