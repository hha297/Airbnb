'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';

import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import { FaGoogle } from 'react-icons/fa';
import { signIn } from 'next-auth/react';

import useLoginModal from '@/app/hooks/useLoginModal';

const RegisterModal = () => {
        const registerModal = useRegisterModal();
        const loginModal = useLoginModal();
        const [isLoading, setIsLoading] = useState(false);
        const {
                register,
                handleSubmit,
                formState: { errors },
        } = useForm<FieldValues>({
                defaultValues: {
                        email: '',
                        name: '',
                        password: '',
                },
        });
        const onSubmit: SubmitHandler<FieldValues> = async (data) => {
                setIsLoading(true);
                axios.post('/api/register', data)
                        .then(() => {
                                toast.success('Account created successfully.');
                                registerModal.onClose();
                                loginModal.onOpen();
                        })
                        .catch((error) => {
                                toast.error('Something went wrong');
                        })
                        .finally(() => {
                                setIsLoading(false);
                        });
        };

        const toggle = useCallback(() => {
                registerModal.onClose();
                loginModal.onOpen();
        }, [loginModal, registerModal]);

        const bodyContent = (
                <div className="flex flex-col gap-4">
                        <Heading title="Welcome to Airbnb" subtitle="Create an account" center />
                        <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
                        <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
                        <Input id="password" label="Password" type="password" disabled={isLoading} register={register} errors={errors} required />
                </div>
        );

        const footerContent = (
                <div className="flex flex-col gap-4 mt-3">
                        <hr />
                        <Button outline label="Continue with Google" icon={FaGoogle} onClick={() => signIn('google')} />
                        <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => signIn('github')} />
                        <div className="flex flex-row items-center justify-center gap-2 mt-2">
                                <div>Already have an account?</div>
                                <div className="text-rose-500 hover:underline cursor-pointer" onClick={toggle}>
                                        Log in here
                                </div>
                        </div>
                </div>
        );
        return (
                <Modal
                        disabled={isLoading}
                        isOpen={registerModal.isOpen}
                        title="Register"
                        actionLabel="Continue"
                        onClose={registerModal.onClose}
                        onSubmit={handleSubmit(onSubmit)}
                        body={bodyContent}
                        footer={footerContent}
                />
        );
};

export default RegisterModal;
