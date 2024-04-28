import ReactDOM from 'react-dom/client';
import App from '@/components/App';
import '@/style.css';
import { BrowserRouter } from 'react-router-dom';
import { Account } from '@/context/Account';
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <RecoilRoot>
            <Account>
                <App />
            </Account>
        </RecoilRoot>
    </BrowserRouter>
);
