import { CopyIcon, Mail, User } from 'lucide-react'
import { FC } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { generateInitialFromName } from '@/lib/utils'

interface AccountProps {

}


const Account: FC<AccountProps> = ({ }) => {

  return (
    <div className="px-4 py-6">
      <form action="#">
        <div className="form-container vertical">
          <div>
            <h5 className='text-xl font-medium mb-2'>General</h5>
            <p className='text-base text-gray-500'>
              Basic info, like your name and address.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 py-8 border-b border-gray-200 dark:border-gray-600 items-center">
            <div className="text-muted-foreground text-sm">Name</div>
            <div className="col-span-2">
              <div className="form-item vertical mb-0 max-w-[700px]">
                <div className="relative ">
                  <User className='absolute top-1/2 -translate-y-1/2  left-2  w-6 h-6 text-gray-400' />
                  <Input placeholder='Your Name' className='h-10 pl-10' />
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 py-8 border-b border-gray-200 dark:border-gray-600 items-center">
            <div className="text-muted-foreground text-sm">Email</div>
            <div className="col-span-2">
              <div className="form-item vertical mb-0 max-w-[700px]">
                <div className="relative">
                  <Mail className='absolute top-1/2 -translate-y-1/2  left-2  w-6 h-6 text-gray-400' />
                  <Input placeholder='Your Email' className='h-10 pl-10' />
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 py-8 border-b border-gray-200 dark:border-gray-600 items-center">
            <div className="text-muted-foreground text-sm">Avatar</div>
            <div className="col-span-2">
              <div className="form-item vertical mb-0 max-w-[700px]">
                <div className="flex items-center justify-between gap-2 ">
                  <Label htmlFor='profile-avatar' className='curs'>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>{generateInitialFromName("ak")}</AvatarFallback>
                    </Avatar>
                  </Label>
                  <Input type='file' id='profile-avatar' placeholder='Upload you profile picture here' className='flex-1 h-10' />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h5 className='text-xl font-medium mb-2'>Preferences</h5>
            <p className='text-gray-500'>Your personalized preference displayed in your account</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 py-8 items-center">
            {/* api key */}
            <div className="text-muted-foreground text-sm">API Key</div>
            <div className="col-span-2">
              <div className="mb-0 max-w-[700px] ">
                <div className="flex items-center space-x-2 pt-4">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="apiKey" className="sr-only">
                      Link
                    </Label>
                    <Input
                      id="apiKey"
                      defaultValue="https://platform.openai.com/playground/p/7bbKYQvsVkNmVb8NGcdUOLae?model=text-davinci-003"
                      readOnly
                      className="h-9 truncate"
                    />
                  </div>
                  <Button type="button" size="default" className="p-[10px] h-9 w-9 text-white">
                    <span className="sr-only">Copy</span>
                    <CopyIcon color="#ffffff" absoluteStrokeWidth className="w-full h-full text-white" />
                  </Button>
                </div>
              </div>
            </div>
            <Separator className='col-span-3' />
            {/* bearer token  */}
            <div className="text-muted-foreground text-sm">Bearer Key</div>
            <div className="col-span-2">
              <div className="mb-0 max-w-[700px]">
                <div className="flex items-center space-x-2 pt-4">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="bearerToken" className="sr-only">
                      Link
                    </Label>
                    <Input
                      id="bearerToken"
                      defaultValue="fdsfhuioahfdbdfohoknfoaksdf"
                      readOnly
                      className="h-9 truncate"
                    />
                  </div>
                  <Button type="button" size="default" className="p-[10px] w-9 h-9 text-white ">
                    <span className="sr-only">Copy</span>
                    <CopyIcon color="#ffffff" absoluteStrokeWidth className="w-full h-full text-white" />
                  </Button>
                </div>
              </div>
            </div>
          </div>


          <div className="py-8  border-gray-200">
            <div className="mt-4 ltr:text-right">
              <Button
                className="button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round h-11 px-8 py-2 ltr:mr-2 rtl:ml-2"
                type="button"
              >
                Reset
              </Button>
              <Button
                className="button bg-primary/90 hover:bg-primary active:bg-primary text-white radius-round h-11 px-8 py-2"
                type="submit"
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>

  )
}

export default Account