"use client"
import { trpc } from '@/app/_trpc/client'
import { LeadsFormSchema } from '@/schema/LeadSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { toast } from '../ui/use-toast'
import { AxiosError } from 'axios'
import { TRPCError } from '@trpc/server'

interface LeadsFormProps {
    campaignCode: string
}

const LeadsForm: FC<LeadsFormProps> = ({ campaignCode }) => {
    const form = useForm<z.infer<typeof LeadsFormSchema>>({
        resolver: zodResolver(LeadsFormSchema),
        defaultValues: {
            campaignCode: campaignCode,
            name: "",
            phone: "",
            address: "",

        },
    });
    const utils = trpc.useContext();

    const { mutateAsync: addLead, isLoading } = trpc.lead.add.useMutation({
        onSuccess: (data) => {
            toast({
                title: `Lead Added Successfully.`,
                description: "",
                variant: "success",
            });
        },
        onError: (err) => {
            if (err instanceof TRPCError) {
                return toast({
                    title: "Cannot Add Lead.",
                    description: "",
                    variant: "destructive",
                });
            }
        },
        onSettled() {
            utils.lead.getCampaignLeads.invalidate();
        },
    })
    async function onSubmit(values: z.infer<typeof LeadsFormSchema>) {
        console.log(values)
        addLead(values)
    }
    return (

        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size={'sm'}>Add a Lead</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        method="post">
                        <DialogHeader>
                            <DialogTitle>Add a Lead</DialogTitle>
                            <DialogDescription>
                                Fill the Below information to add a new lead manually
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">

                            {/* campaign id */}
                            {/* name */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-4 items-center gap-x-4 gap-y-2 w-full'>
                                        <FormLabel className="text-right">Name</FormLabel>
                                        <FormControl className='col-span-3'>
                                            <Input
                                                placeholder="Enter name"
                                                {...field}
                                                className=""
                                            />
                                        </FormControl>
                                        <FormMessage className='col-span-4 col-start-2 mt-0' />
                                    </FormItem>
                                )}
                            />
                            {/* phone */}
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-4 items-center gap-x-4 gap-y-2 w-full'>
                                        <FormLabel className="text-right">Phone</FormLabel>
                                        <FormControl className='col-span-3'>
                                            <Input
                                                placeholder="Enter Phone number"
                                                {...field}
                                                className=""
                                            />
                                        </FormControl>
                                        <FormMessage className='col-span-4 col-start-2 mt-0' />
                                    </FormItem>
                                )}
                            />

                            {/* phone */}
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-4 items-center gap-x-4 gap-y-2 w-full'>
                                        <FormLabel className="text-right">Address</FormLabel>
                                        <FormControl className='col-span-3'>
                                            <Input
                                                placeholder="Enter Address"
                                                {...field}
                                                className=""
                                            />
                                        </FormControl>
                                        <FormMessage className='col-span-4 col-start-2 mt-0' />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <Button type="submit">Add Lead</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}

export default LeadsForm