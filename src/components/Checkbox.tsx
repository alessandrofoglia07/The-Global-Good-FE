import React from 'react';

interface Props {
    checked: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    label: string;
    id: string;
    labelClassName?: string;
}

const Checkbox: React.FC<Props> = ({ checked, onChange, label, id, labelClassName }: Props) => {
    return (
        <div>
            <label className='flex-inline relative cursor-pointer items-center rounded-full px-3' htmlFor={id}>
                <input
                    type='checkbox'
                    className='peer relative top-1 h-5 w-5 cursor-pointer appearance-none rounded-md border-2 transition-all checked:border-darktan checked:bg-darktan'
                    id={id}
                    checked={checked}
                    onChange={onChange}
                />
                <span className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100'>
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-3.5 w-3.5' viewBox='0 0 20 20' fill='currentColor' stroke='currentColor' strokeWidth='1'>
                        <path
                            fillRule='evenodd'
                            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                            clipRule='evenodd'></path>
                    </svg>
                </span>
            </label>
            <label className={`cursor-pointer select-none capitalize text-taupe/60 ${labelClassName}`} htmlFor={id}>
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
