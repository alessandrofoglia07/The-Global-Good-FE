import { Dialog } from '@headlessui/react';
import React from 'react';
import LoginRequirer from './LoginRequirer';

interface Props {
    onClose: () => void;
    open: boolean;
    text?: string;
}

const LoginRequirerModal: React.FC<Props> = ({ onClose, open, text }: Props) => {
    return (
        <Dialog onClose={onClose} open={open}>
            <div className='fixed inset-0 z-[60] bg-black/25' />
            <Dialog.Panel className='animate-zoom-in-center fixed left-1/2 top-1/2 z-[61] max-h-[90vh] w-full -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-neutral-50 p-8 sm:w-[80vw] md:w-[60vw] lg:w-[50vw]'>
                <LoginRequirer text={text || 'You need to log in to access this.'} />
            </Dialog.Panel>
        </Dialog>
    );
};

export default LoginRequirerModal;
