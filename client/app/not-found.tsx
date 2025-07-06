import { ROUTES } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center h-screen text-center p-4 justify-center">
            <h1 className="text-5xl font-black mb-4">Oops!</h1>
            <p className="mb-6 text-lg font-medium text-gray-600">
                Something went wrong.
            </p>
            <Image src={'/images/404.png'} alt="404" width={655} height={290} />
            <Link href={ROUTES.HOME} className='main-button mt-8'>Go Home</Link>
        </div>
    );
}
