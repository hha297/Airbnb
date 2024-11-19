'use client';
import React from 'react';
import { IconType } from 'react-icons';
interface ButtonProps {
        label: string;
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
        disabled?: boolean;
        outline?: boolean;
        small?: boolean;
        icon?: IconType;
}
const Button: React.FC<ButtonProps> = ({ label, onClick, disabled, outline, small, icon: Icon }) => {
        return (
                <button
                        disabled={disabled}
                        onClick={onClick}
                        className={`relative disabled:opacity-70  transition w-full rounded-lg disabled:cursor-not-allowed 
                                ${outline ? 'hover:bg-rose-500 hover:text-white' : 'hover:bg-rose-600 hover:border-transparent'}
                                ${outline ? 'bg-white' : 'bg-rose-500'} 
                                ${outline ? 'border-black' : 'border-rose-500'} 
                                ${outline ? 'text-black' : 'text-white'}
                                ${small ? 'py-1' : 'py-3'} 
                                ${small ? 'text-sm' : 'text-md'} 
                                ${small ? 'font-light' : 'font-semibold'} 
                                ${small ? 'border-[1px]' : 'border-2'}`}
                >
                        {Icon && <Icon className="absolute right-4 top-3" size={24} />}
                        {label}
                </button>
        );
};

export default Button;
