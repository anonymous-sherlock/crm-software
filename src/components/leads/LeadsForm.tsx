"use client"
import { FC } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { trpc } from '@/app/_trpc/client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'

interface LeadsFormProps {

}

const LeadsFormSchema = z.object({
    name: z.string().min(3, { message: "Name must be atleat 3 characters" }),
    phone: z.string().optional().refine(value => {
        // Enhance the phone number validation pattern
        const phonePattern = /^[\d\+() -]*\d[\d\+() -]*$/;

        // Ensure the phone number has a minimum length (adjust as needed)
        const minLength = 9;
        const maxLength = 13;
        return (
            phonePattern.test(value?.toString() ?? "") &&
            (value?.toString().replace(/[\D]/g, '').length ?? 0) >= minLength &&
            (value?.toString().replace(/[\D]/g, '').length ?? 0) <= maxLength
        )
    }, {
        message: "Phone number is not valid"
    }),
    address: z.string().optional()
})
const LeadsForm: FC<LeadsFormProps> = ({ }) => {
    const form = useForm<z.infer<typeof LeadsFormSchema>>({
        resolver: zodResolver(LeadsFormSchema),
        defaultValues: {
            name: "",
            phone: "",
            address: "",
        },
    });
    const utils = trpc.useContext();
    async function onSubmit(values: z.infer<typeof LeadsFormSchema>) {
        console.log(values)
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