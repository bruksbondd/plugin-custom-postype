import { FC } from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

import { postType } from '@/src/type';

type propsList = {
  postsType: postType[];
};

export const List: FC<propsList> = ({ postsType }) => {
  return (
    <div className='flex flex-wrap items-stretch'>
      {postsType.map((post) => (
        <Card
          key={post.id}
          className='group group/edit relative border-none flex-grow-1 flex-shrink-1  m-[2%] md:m-[1%] w-[100%] md:w-[48%] lg:w-[23%] '
        >
          <a href={post.link}>
            {post.img && (
              <img src={post.img} alt='react logo' style={{ width: '400px' }} />
            )}
            <CardHeader className=' flex flex-row justify-between pb-[6px]'>
              <CardTitle className='group-hover/edit:text-[#1255E1] text-[20px] '>
                {post.title}
              </CardTitle>
              <ArrowRight className='text-[#ABABB4] group-hover/edit:text-[#1255E1] h-5 w-5 shrink-0' />
            </CardHeader>
            <CardContent className='mb-1'>
              <div className='my-[5px]'>
                <div className='flex'>
                  <img
                    width='16'
                    src='https://swivelt.com/wp-content/uploads/2024/02/capital-1.svg'
                    alt='capital'
                  />
                  <div className='text-[16px] text-[#2E2E43] opacity-30 mx-[9px]'>
                    Capital
                  </div>
                </div>
                <div className='text-[#2E2E43] mx-[28px]'>{post.capital}</div>
              </div>

              <div className='my-[5px]'>
                <div className='flex'>
                  <img
                    src='https://swivelt.com/wp-content/uploads/2024/02/language-1.svg'
                    alt='language'
                    width='16'
                  />
                  <div className='text-[16px] text-[#2E2E43] opacity-30 mx-[9px]'>
                    Official languages
                  </div>
                </div>
                <div className='text-[#2E2E43] mx-[28px]'>
                  {post.official_language_}
                </div>
              </div>

              <div className='my-[5px]'>
                <div className='flex'>
                  <img
                    src='https://swivelt.com/wp-content/uploads/2024/02/currency-1.svg'
                    alt='currency'
                    width='16'
                  />
                  <div className='text-[16px] text-[#2E2E43] opacity-30 mx-[9px]'>
                    Currency
                  </div>
                </div>
                <div className='text-[#2E2E43] mx-[28px]'>{post.currency}</div>
              </div>
            </CardContent>
          </a>
        </Card>
      ))}
    </div>
  );
};
