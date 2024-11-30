'use client';

import useCountries from '@/app/hooks/useCountry';
import { SafeUser } from '@/app/types';
import Heading from '../Heading';
import Image from 'next/image';
import HeartButton from '../HeartButton';

interface ListingHeadProps {
        title: string;
        imageSrc: string;
        locationValue: string;
        id: string;
        currentUser?: SafeUser | null;
}
const ListingHead: React.FC<ListingHeadProps> = ({ title, imageSrc, locationValue, id, currentUser }) => {
        const { getByValue } = useCountries();
        const location = getByValue(locationValue);

        return (
                <div>
                        <Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />
                        <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                                <Image src={imageSrc} alt="Image" fill className="object-cover w-full mt-4 rounded-xl" />
                                <div className="absolute top-8 right-4 ">
                                        <HeartButton listingId={id} currentUser={currentUser} />
                                </div>
                        </div>
                </div>
        );
};

export default ListingHead;
