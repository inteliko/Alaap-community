"use client"


import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from "@/lib/validations/user";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea} from "@/components/ui/textarea"

import Image from 'next/image';


import * as z from "zod"
import { ChangeEvent } from 'react';


interface props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
        
    };
    btnTitle: string;
    
}

const AccountProfile = ({user, btnTitle} : props ) => {
    
    const form = useForm({
        resolver: zodResolver( UserValidation  ),
        defaultValues: {
            profile_photo: user?.image || '',
            name: user?.name ||  '',
            username: user?.username || '',
            bio: user?.bio || '',
        }
    })

    const handleImage = (e: ChangeEvent, fieldChange: (value: string)  => void )  => {
      e.preventDefault();
    }

     // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof UserValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }


    return (
        <Form {...form}>
        <form
         onSubmit={form.handleSubmit(onSubmit)} 
        className=" flex flex-col justify-start gap-1 ">
          
          <FormField
          control={form.control}
          name='profile_photo'
          render={({ field }) => (
            <FormItem className='flex items-center gap-4'>
              <FormLabel className='account-form_image-label'>
                {field.value ? (
                  <Image
                    src={field.value}
                    alt='profile_icon'
                    width={96}
                    height={96}
                    priority
                    className='rounded-full object-contain'
                  />
                ) : (
                  <Image
                    src='/assets/profile.svg'
                    alt='profile_icon'
                    width={24}
                    height={24}
                    className='object-contain'
                  />
                )}
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input
                  type='file'
                  accept='image/*'
                  placeholder='Add profile photo'
                  className='account-form_image-input'
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='flex flex-col w-full  gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='account-form_input no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='flex flex-col w-full  gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='account-form_input no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem className='flex flex-col w-full  gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Name
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  className='account-form_input no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />





          <Button type="submit" className='bg-primary-500' >Submit</Button>
        </form>
      </Form>
  
    )
}

export default AccountProfile;