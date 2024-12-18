'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';

import useRentModal from '@/app/hooks/useRentModal';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';

import { TbHomePlus } from 'react-icons/tb';

interface UserMenuProps {
        currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
        const router = useRouter();
        const registerModal = useRegisterModal();
        const loginModal = useLoginModal();
        const rentModal = useRentModal();
        const [isOpen, setIsOpen] = useState(false);
        const toggleOpen = () => setIsOpen((value) => !value);

        const onRent = useCallback(() => {
                if (!currentUser) {
                        return loginModal.onOpen();
                }
                rentModal.onOpen();
                //Open rent modal
        }, [currentUser, loginModal, rentModal]);
        return (
                <div className="relative">
                        <div className="flex flex-row items-center gap-3">
                                <div className="flex-row border-[1px] hidden md:flex text-sm font-semibold py-3 px-4 rounded-full hover:shadow-md transition cursor-pointer" onClick={onRent}>
                                        <TbHomePlus size={18} className="text-rose-500 mr-2 " />
                                        <div>Airbnb your home</div>
                                </div>

                                <div
                                        onClick={toggleOpen}
                                        className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                                >
                                        <AiOutlineMenu />
                                        <div className="hidden md:block">
                                                <Avatar src={currentUser?.image || '/placeholder.png'} />
                                        </div>
                                </div>
                        </div>
                        {isOpen && (
                                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                                        <div className="flex flex-col cursor-pointer">
                                                {currentUser ? (
                                                        <div>
                                                                <MenuItem onClick={() => router.push('/trips')} label="My trips" />
                                                                <MenuItem onClick={() => router.push('/favorites')} label="My Favorites" />
                                                                <MenuItem
                                                                        onClick={() => {
                                                                                router.push('/reservations');
                                                                        }}
                                                                        label="My Reservations"
                                                                />
                                                                <MenuItem onClick={() => router.push('/properties')} label="My Properties" />
                                                                <MenuItem onClick={rentModal.onOpen} label="Airbnb my home" />
                                                                <hr />
                                                                <MenuItem onClick={() => signOut()} label="Sign Out" className="text-red-500" />
                                                        </div>
                                                ) : (
                                                        <div>
                                                                <MenuItem onClick={loginModal.onOpen} label="Login" />
                                                                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
                                                        </div>
                                                )}
                                        </div>
                                </div>
                        )}
                </div>
        );
};

export default UserMenu;
