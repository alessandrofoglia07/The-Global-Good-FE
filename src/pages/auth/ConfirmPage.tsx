import React, { useState } from 'react';

const ConfirmPage = () => {
    const [code, setCode] = useState('');

    return (
        <div className='grid h-full w-full place-items-center'>
            <form className='flex flex-col gap-2 *:p-4 *:text-black'>
                <input name='code' placeholder='Confirmation code' onChange={(e) => setCode(e.target.value)} value={code} />
                <button type='submit'>Confirm</button>
            </form>
        </div>
    );
};

export default ConfirmPage;
