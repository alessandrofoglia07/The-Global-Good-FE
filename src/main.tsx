import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/components/App';
import '@/style.css';
import { BrowserRouter } from 'react-router-dom';
import { Account } from '@/context/Account';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Account>
                <App />
            </Account>
        </BrowserRouter>
    </React.StrictMode>
);
