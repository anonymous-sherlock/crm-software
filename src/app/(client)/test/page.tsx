"use client"
import Skeleton from 'react-loading-skeleton'

export default function TestPage() {

    return (
        <Skeleton height={100} className='my-2' count={3} />
    );
}

