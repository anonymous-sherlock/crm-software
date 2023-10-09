"use client"
import { serverClient } from '@/app/_trpc/serverClient'
import {
  Form,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn, generateInitialFromName } from '@/lib/utils'
import { Copy, Mail, User as UserIcon } from 'lucide-react'
import { ButtonHTMLAttributes, FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { toast } from '../ui/use-toast'

interface AccountProps {
  user: Awaited<ReturnType<(typeof serverClient)["user"]["get"]>>
}

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"
import { trpc } from '@/app/_trpc/client'
import Spinner from '../ui/spinner'
import { ToastAction } from '../ui/toast'

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  apikey: z.string(),
  bearerToken: z.string()
})

const Account: FC<AccountProps> = ({ user }: AccountProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(true)
  const [avatarImage, setAvatarImage] = useState<File>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      apikey: user?.apiKeys.find((apiKey) => apiKey.enabled === true)?.key,
      bearerToken: user?.BearerToken.find((token) => token.active === true)?.key
    }
  })

  const { mutateAsync: generateApi, data: newApiKey, isLoading: isGeneratingApi } = trpc.user.generateApi.useMutation({
    onSuccess(data,) {
      toast({
        title: "API Generated sucessfully.",
        variant: "success",
        action: <ToastAction altText="Copy API Key" onClick={() => navigator.clipboard.writeText(data?.key || "")}>Copy API Key  </ToastAction>,
      });
    },
    onError() {

    }
  })

  const { mutateAsync: generateBearerToken, data: newBearerToken, isLoading: isGeneratingBearerToken, } = trpc.user.generateBearerToken.useMutation({
    onSuccess(data,) {
      toast({
        title: "API Generated sucessfully.",
        variant: "success",
        action: <ToastAction altText="Copy API Key" onClick={() => navigator.clipboard.writeText(data?.key || "")}>Copy Bearer Key </ToastAction>,
      });
    },
    onError() {

    }
  })


  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="px-4 py-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} >
          <div className="form-container vertical">
            <div className='flex justify-between items-center'>
              <div className='flex-1'>
                <h5 className='text-xl font-medium mb-2'>General</h5>
                <p className='text-base text-gray-500'>
                  Basic info, like your name and address.
                </p>
              </div>
              <Button onClick={() => {
                setIsEditing(prev => (!prev))
              }} type='button' variant={!isEditing ? "destructive" : "secondary"} className={cn("p-4 hover:ring-2 ring-primary/20 focus:ring-2 ")}>{!isEditing ? 'Cancel' : 'Edit Profile'}</Button>
            </div>
            {/* user name */}
            <div className="grid md:grid-cols-3 gap-4 py-8 border-b border-gray-200 dark:border-gray-600 items-center">
              <div className="text-muted-foreground text-sm">Name</div>
              <div className="col-span-2">
                <div className="form-item vertical mb-0 max-w-[700px]">
                  <div className="relative ">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (<FormItem>
                        <UserIcon className='absolute top-1/2 -translate-y-1/2  left-2  w-6 h-6 text-gray-400' />
                        <Input placeholder='Your Name' className='h-10 pl-10' {...field}
                          disabled={isEditing} />
                        <FormMessage />
                      </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* user image */}
            <div className="grid md:grid-cols-3 gap-4 py-8 border-b border-gray-200 dark:border-gray-600 items-center">
              <div className="text-muted-foreground text-sm">Email</div>
              <div className="col-span-2">
                <div className="form-item vertical mb-0 max-w-[700px]">
                  <div className="relative">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (<FormItem>
                        <Mail className='absolute top-1/2 -translate-y-1/2  left-2  w-6 h-6 text-gray-400' />
                        <Input placeholder='Your Email' className='h-10 pl-10' {...field} disabled={isEditing} />
                        <FormMessage />
                      </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* user image */}
            <div className="grid md:grid-cols-3 gap-4 py-8 border-b border-gray-200 dark:border-gray-600 items-center">
              <div className="text-muted-foreground text-sm">Avatar</div>
              <div className="col-span-2">
                <div className="form-item vertical mb-0 max-w-[700px]">
                  <div className="flex items-center justify-between gap-2 ">
                    <Label htmlFor='profile-avatar' className='cursor-pointer'>
                      <Avatar className='w-14 h-14'>
                        <AvatarImage src={avatarImage ? URL.createObjectURL(avatarImage) : user?.image as string} alt={user?.name} />
                        <AvatarFallback>{generateInitialFromName(user?.name || "")}</AvatarFallback>
                      </Avatar>
                    </Label>
                    <Input type='file' id='profile-avatar' placeholder='Upload you profile picture here' className={cn(' hidden')} disabled={isEditing}
                      onChange={(event) => {
                        if (event.target.files) {
                          const file = event.target.files[0];
                          setAvatarImage(file)
                        }
                      }} />
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
                    <div className="relative  grid flex-1 gap-2">
                      <FormField
                        control={form.control}
                        name="apikey"
                        render={({ field }) => (<FormItem>
                          <Label htmlFor="apiKey" className="sr-only">
                            API Key
                          </Label>
                          <Input
                            readOnly
                            placeholder='Generate a new Api key...'
                            className={cn("h-9 truncate pr-[52px] !mt-0 text-gray-500")}
                            {...field}
                            disabled={isGeneratingApi}
                            value={newApiKey ? newApiKey.key : isGeneratingApi ? "Generating Api Key..." : field.value}
                          />
                          {user?.apiKeys.some((apiKey) => apiKey.enabled === true) || (newApiKey && newApiKey.enabled === true) ? (
                            <CopyButton
                              type='button'
                              aria-label='API Key'
                              disabled={isGeneratingApi}
                              className={cn('absolute inset-y-0 right-0 animate-in fade-in duration-300 !my-0 bg-gray-200/60')}
                              valueToCopy={newApiKey ? newApiKey.key : field.value ?? ""}
                            />
                          ) : null}
                          <FormMessage />
                        </FormItem>
                        )}
                      />
                    </div>
                    <div className={cn("w-50 flex justify-center sm:mt-0 sm:ml-4 sm:flex-shrink-0")}>
                      <Button type="button" className='w-44 mt-0'
                        disabled={isGeneratingApi}
                        onClick={(event) => {
                          event.preventDefault();
                          generateApi();
                        }} >
                        {isGeneratingApi ? <Spinner /> : 'Request Api Key'}

                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <Separator className='col-span-3' />
              {/* bearer token  */}
              <div className="text-muted-foreground text-sm">Bearer Key</div>
              <div className="col-span-2">
                <div className="mb-0 max-w-[700px]">
                  <div className="flex items-center space-x-2 pt-4">
                    <div className="relative grid flex-1 gap-2">
                      <FormField
                        control={form.control}
                        name="bearerToken"
                        render={({ field }) => (<FormItem>
                          <Label htmlFor="bearerToken" className="sr-only">
                            Link
                          </Label>
                          <Input
                            id="bearerToken"
                            placeholder='Generate a new Bearer key...'
                            readOnly
                            {...field}
                            disabled={isGeneratingBearerToken}
                            className={cn("h-9 truncate pr-[52px] !mt-0 text-gray-500")}
                            value={newBearerToken ? newBearerToken.key : isGeneratingBearerToken ? "Generating Bearer Key..." : field.value}
                          />
                          {user?.BearerToken.some((token) => token.active === true) || (newBearerToken && newBearerToken.active === true) ? (
                            <CopyButton
                              type="button"
                              aria-label='Bearer Token'
                              disabled={isGeneratingBearerToken}
                              className={cn('absolute inset-y-0 right-0 animate-in fade-in duration-300 !my-0 bg-gray-200/60')}
                              valueToCopy={newBearerToken ? newBearerToken.key : field.value ?? ""}
                            />
                          ) : null}
                          <FormMessage />
                        </FormItem>
                        )}
                      />
                    </div>
                    <div className={cn("w-50 flex justify-center sm:mt-0 sm:ml-4 sm:flex-shrink-0 mt-0")}>
                      <Button type="button" className='w-44 mt-0'
                        disabled={isGeneratingBearerToken}
                        onClick={(event) => {
                          event.preventDefault();
                          generateBearerToken();
                        }}
                      >
                        {isGeneratingBearerToken ? <Spinner /> : 'Request Bearer Key'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-8  border-gray-200">
              <div className="mt-4 ltr:text-right">
                <Button
                  className="button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round h-11 px-8 py-2 ltr:mr-2 rtl:ml-2"
                  type="button"
                  onClick={() => form.reset()}
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
      </Form>
    </div >

  )
}


interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueToCopy: string
}

const CopyButton: FC<CopyButtonProps> = ({
  valueToCopy,
  className,
  ...props
}) => {
  return (
    <Button
      {...props}
      type='button'
      onClick={() => {
        navigator.clipboard.writeText(valueToCopy)

        toast({
          title: 'Copied',
          description: `${props['aria-label']} copied to clipboard`,
          variant: 'success',
        })
      }}
      variant='ghost'
      className={cn('', className)}>
      <Copy className='h-5 w-5' />
    </Button>
  )
}

export default Account