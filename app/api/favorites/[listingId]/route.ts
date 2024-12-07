/* eslint-disable prefer-const */
import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

type IParams = Promise<{ listingId?: string }>;

export async function POST(request: Request, { params }: { params: IParams }) {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
                return new Response('Unauthorized', { status: 401 });
        }

        const { listingId } = (await params).listingId;
        if (!listingId || typeof listingId !== 'string') {
                throw new Error('Invalid ID');
        }

        let favoriteIds = [...(currentUser.favoriteIds || [])];

        favoriteIds.push(listingId);

        const user = await prisma.user.update({
                where: {
                        id: currentUser.id,
                },
                data: {
                        favoriteIds,
                },
        });

        return NextResponse.json(user);
}
export async function DELETE(request: Request, { params }: { params: IParams }) {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
                return new Response('Unauthorized', { status: 401 });
        }

        const { listingId } = (await params).listingId;
        if (!listingId || typeof listingId !== 'string') {
                throw new Error('Invalid ID');
        }

        let favoriteIds = [...(currentUser.favoriteIds || [])];

        favoriteIds = favoriteIds.filter((id) => id !== listingId);

        const user = await prisma.user.update({
                where: {
                        id: currentUser.id,
                },
                data: {
                        favoriteIds,
                },
        });

        return NextResponse.json(user);
}
