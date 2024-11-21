'use client';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import { FaGoogle } from 'react-icons/fa';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
const LoginModal = () => {
        const router = useRouter();
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

                        password: '',
                },
        });
        const onSubmit: SubmitHandler<FieldValues> = async (data) => {
                setIsLoading(true);
                signIn('credentials', {
                        ...data,
                        redirect: false,
                })
                        .then((callback) => {
                                setIsLoading(false);
                                if (callback?.error) {
                                        toast.error(callback?.error);
                                }
                                if (callback?.ok && !callback?.error) {
                                        toast.success('Logged in successfully');
                                        router.refresh();
                                        loginModal.onClose();
                                }
                        })
                        .finally(() => {
                                setIsLoading(false);
                        });
        };
        const bodyContent = (
                <div className="flex flex-col gap-4">
                        <Heading title="Welcome back" subtitle="Login to your account" center />
                        <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />

                        <Input id="password" label="Password" type="password" disabled={isLoading} register={register} errors={errors} required />
                </div>
        );

        const footerContent = (
                <div className="flex flex-col gap-4 mt-3">
                        <hr />
                        <Button outline label="Continue with Google" icon={FaGoogle} onClick={() => {}} />
                        <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => {}} />
                        <div className="flex flex-row items-center justify-center gap-2 mt-2">
                                <div>Already have an account?</div>
                                <div className="text-rose-500 hover:underline cursor-pointer" onClick={registerModal.onClose}>
                                        Log in here
                                </div>
                        </div>
                </div>
        );
        return (
                <Modal
                        disabled={isLoading}
                        isOpen={loginModal.isOpen}
                        title="Login"
                        actionLabel="Continue"
                        onClose={loginModal.onClose}
                        onSubmit={handleSubmit(onSubmit)}
                        body={bodyContent}
                        footer={footerContent}
                />
        );
};

export default LoginModal;
