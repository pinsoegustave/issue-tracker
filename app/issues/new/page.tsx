"use client"
import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import axios from 'axios';
import { Button, Callout, TextField } from '@radix-ui/themes';
import { useForm, Controller } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false
});

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const [ error, setError ] = useState('');

  return (
    <div className='max-w-xl'>
      { error && ( 
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{ error }</Callout.Text>
        </Callout.Root> 
      )}
    <form 
      className='max-w-xl space-y-3'
      onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post('/api/issues', data); 
          router.push('/issues');
        } catch (error) {
          setError('An unexpected error occured');
        }
      })}
      >
        <TextField.Root placeholder="Title" {...register('title')} />
        <Controller
        name='description'
        control={control}
        render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
        />
        
        <Button>Submit New Issue</Button>
    </form>
    </div>
  )
}

export default NewIssuePage