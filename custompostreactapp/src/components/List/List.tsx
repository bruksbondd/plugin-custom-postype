import React, { FC } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

import styles from './List.module.css';
import { postType } from '@/src/type';
import { Button } from '../ui/button'

type propsList = {
  postsType: postType[];
};

export const List: FC<propsList> = ({ postsType }) => {
  return (
    <div className='flex flex-wrap items-stretch'>
      {postsType.map((post) => (
        <Card key={post.id} className=' relative flex-grow-1 flex-shrink-1  m-[2%] w-[100%] md:w-[46%] lg:w-[21%]'>
         
          {post.img && <img src={post.img} alt="react logo" style={{ width: '400px', }}/>}
          <CardHeader>
            <CardTitle className='text-center text-[24px]'>{post.title}</CardTitle>
          </CardHeader>
          <CardContent className='mb-14'>
            <div className='mask-opacity max-h-44 overflow-hidden' dangerouslySetInnerHTML={{ __html: post.content }}></div>
          </CardContent>
          <CardFooter className='absolute bottom-0 w-full'>
            <Button variant="default" className='w-full bg-sky-800 hover:bg-yellow-400'>
              <a className='absolute w-[100%]' href={post.link}>More</a>
              </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
