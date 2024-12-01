'use client';

import { Range } from 'react-date-range';
import Calendar from '../inputs/Calendar';
import Button from '../Button';

interface ListingReservationProps {
        price: number;
        dateRange: Range;
        totalPrice: number;
        onChangeDate: (value: Range) => void;
        onSubmit: () => void;
        disabled?: boolean;
        disabledDates: Date[];
}
const ListingReservation: React.FC<ListingReservationProps> = ({ price, dateRange, totalPrice, onChangeDate, onSubmit, disabled, disabledDates }) => {
        return (
                <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
                        <div className="flex flex-row items-center gap-1 p-4">
                                <div className="text-xl font-semibold">$ {price}</div>
                                <div className="text-lg font-medium">/ night</div>
                        </div>
                        <hr />
                        <Calendar value={dateRange} onChange={(value) => onChangeDate(value.selection)} disabledDates={disabledDates} />
                        <hr />
                        <div className="p-4">
                                <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
                        </div>

                        <div className="p-4 flex flex-row items-center justify-between font-semibold text-xl">
                                <div>Total</div>
                                <div>$ {totalPrice}</div>
                        </div>
                </div>
        );
};

export default ListingReservation;
