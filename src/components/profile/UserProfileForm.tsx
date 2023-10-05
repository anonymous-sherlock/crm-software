"use client"
import { cn } from '@/lib/utils';
import { User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { useSession } from 'next-auth/react';

type UserProfileFormProps = {
    user: Pick<User, "name" | "image" | "email">;
};
export const UserProfileForm = ({ user }: UserProfileFormProps) => {
    const { data: session, update } = useSession();

    const form = useForm({
        defaultValues: {
            name: user.name,
        },
    });
    async function onSubmit(values: any) {
        console.log(values);
        await update({
            ...session,
            user: {
                ...session?.user,
                name: "abc",
            },
        });
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                method="post"
                className="grid grid-cols-5 items-start gap-8 space-y-4 "
            >
                <div className="col-span-3 flex w-full flex-col gap-6">
                    <div className="gap-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Your Name"
                                            id="hello"
                                            {...field}
                                            className="h-11"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="col-span-2 !mt-0 flex flex-col gap-4 gap-y-6">
                </div>
                <Button
                    type="submit"
                    className={cn("w-full col-span-1")}
                >
                    Update Profile
                </Button>
            </form>
            <Button
                className="border bg-violet-600 text-white rounded px-4 py-2"
                onClick={() => console.log({ session })}
            >
                Log Session
            </Button>
        </Form>
    )
}