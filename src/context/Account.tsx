import { PropsWithChildren, createContext } from 'react';
import userPool from '@/utils/userPool';
import { AuthenticationDetails, CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';

type IAuthContext = {
    authenticate: (Username: string, Password: string) => Promise<CognitoUserSession>;
    getSession: () => Promise<CognitoUserSession | null>;
    logout: () => void;
};

const AccountContext = createContext<IAuthContext>({} as IAuthContext);

const Account = ({ children }: PropsWithChildren) => {
    const getSession = async () => {
        return await new Promise<CognitoUserSession | null>((resolve, reject) => {
            const user = userPool.getCurrentUser();
            if (user) {
                user.getSession((err: Error | null, session: CognitoUserSession | null) => {
                    if (err) reject(err);
                    else resolve(session);
                });
            } else reject();
        });
    };

    const authenticate = async (Username: string, Password: string) => {
        return await new Promise<CognitoUserSession>((resolve, reject) => {
            const cognitoUser = new CognitoUser({ Username, Pool: userPool });

            const authenticationDetails = new AuthenticationDetails({ Username, Password });

            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (data) => resolve(data),
                onFailure: (err) => reject(err)
            });
        });
    };

    const logout = () => {
        const user = userPool.getCurrentUser();
        if (user) user.signOut();
    };

    return <AccountContext.Provider value={{ authenticate, getSession, logout }}>{children}</AccountContext.Provider>;
};

export { Account, AccountContext };
