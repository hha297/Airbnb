import React from 'react';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavoriteListings';
import FavoriteClient from './FavoriteClient';
const FavoritePage = async () => {
        const currentUser = await getCurrentUser();
        const favoriteListings = await getFavoriteListings();

        if (favoriteListings.length === 0) {
                return (
                        <ClientOnly>
                                <EmptyState title="No favorites found" subtitle="Looks like you have no favorite listings." />;
                        </ClientOnly>
                );
        }
        return (
                <ClientOnly>
                        <FavoriteClient favoriteListings={favoriteListings} currentUser={currentUser} />
                </ClientOnly>
        );
};

export default FavoritePage;
