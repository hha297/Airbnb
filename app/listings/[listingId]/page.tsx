import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import EmptyState from '@/app/components/EmptyState';
import React from 'react';
import ListingClient from './ListingClient';
import ClientOnly from '@/app/components/ClientOnly';

interface IParams {
        listingId?: string;
}
const ListingPage = async ({ params }: { params: IParams }) => {
        const currentUser = await getCurrentUser();
        const listing = await getListingById(params);
        console.log(listing);
        if (!listing)
                return (
                        <ClientOnly>
                                <EmptyState />
                        </ClientOnly>
                );
        return (
                <ClientOnly>
                        <ListingClient listing={listing} currentUser={currentUser} />
                </ClientOnly>
        );
};

export default ListingPage;
