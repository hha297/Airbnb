/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { IconType } from 'react-icons';
import qs from 'query-string';
interface CategoryBoxProps {
        icon: IconType;
        label: string;
        selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ icon: Icon, label, selected }) => {
        const router = useRouter();
        const params = useSearchParams();

        const handleClick = useCallback(() => {
                let currentQuery = {};

                if (params) {
                        currentQuery = qs.parse(params.toString());
                }

                const updatedQuery: any = {
                        ...currentQuery,
                        category: label,
                };

                if (params?.get('category') === label) {
                        delete updatedQuery.category;
                }

                const url = qs.stringifyUrl(
                        {
                                url: '/',
                                query: updatedQuery,
                        },
                        {
                                skipNull: true,
                        },
                );

                router.push(url);
        }, [label, params, router]);
        return (
                <div
                        onClick={handleClick}
                        className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-rose-600 transition cursor-pointer 
                                ${selected ? 'border-b-rose-500' : 'border-transparent'}
                                ${selected ? 'text-rose-500' : 'text-neutral-500'}
                                `}
                >
                        <Icon size={26} />
                        <div className="text-sm font-bold">{label}</div>
                </div>
        );
};

export default CategoryBox;
