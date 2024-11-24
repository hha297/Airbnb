'use client';

import { IconType } from 'react-icons';

interface CategoryInputProps {
        icon: IconType;
        label: string;
        selected?: boolean;
        onClick: (value: string) => void;
}
const CategoryInput: React.FC<CategoryInputProps> = ({ icon: Icon, label, selected, onClick }) => {
        return (
                <div
                        onClick={() => onClick(label)}
                        className={`rounded-xl border-2 p-4 flex flex-col text-center md:flex-row gap-3 hover:border-rose-500 hover:text-rose-500 transition cursor-pointer 
                                ${selected ? ' text-rose-500' : ''}
                                ${selected ? 'border-rose-500' : 'border-neutral-200'}
                                `}
                >
                        <Icon size={30} />
                        <div className="flex font-semibold items-center">{label}</div>
                </div>
        );
};

export default CategoryInput;
