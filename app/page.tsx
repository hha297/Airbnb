import Image from 'next/image';
import Container from './components/Container';
import EmptyState from './components/EmptyState';
import getListings, { IListingsParams } from './actions/getListings';
import ListingCard from './components/listings/ListingCard';
import getCurrentUser from './actions/getCurrentUser';
interface HomeProps {
        searchParams: IListingsParams;
}
const Home = async ({ searchParams }: HomeProps) => {
        const listing = await getListings(searchParams);
        const currentUser = await getCurrentUser();

        if (listing.length === 0) {
                return (
                        <div className="flex items-center justify-center h-full w-full text-neutral-500">
                                <EmptyState showReset />
                        </div>
                );
        }
        return (
                <Container>
                        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                                {listing.map((listing) => (
                                        <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
                                ))}
                        </div>
                </Container>
        );
};

export default Home;
