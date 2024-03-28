import { PropsWithChildren, createContext } from 'react';
import userPool from '@/utils/userPool';
import { AuthenticationDetails, CognitoUser, CognitoUserSession, ICognitoStorage } from 'amazon-cognito-identity-js';
import { PasswordSchema } from '@/utils/schemas/authSchemas';

type IAuthContext = {
    authenticate: (Username: string, Password: string, Storage: ICognitoStorage) => Promise<CognitoUserSession>;
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

    const authenticate = async (UsernameOrEmail: string, Password: string, Storage: ICognitoStorage = localStorage) => {
        return await new Promise<CognitoUserSession>((resolve, reject) => {
            const validate = PasswordSchema.safeParse(Password);

            if (!UsernameOrEmail || !Password) {
                reject('Please fill in all fields.');
            } else if (!validate.success) {
                reject(validate.error.errors[0]?.message);
            } else {
                const cognitoUser = new CognitoUser({ Username: UsernameOrEmail, Pool: userPool, Storage });

                const authenticationDetails = new AuthenticationDetails({ Username: UsernameOrEmail, Password });

                cognitoUser.authenticateUser(authenticationDetails, {
                    onSuccess: (data) => resolve(data),
                    onFailure: (err) => reject(err)
                });
            }
        });
    };

    const logout = () => {
        const user = userPool.getCurrentUser();
        if (user) user.signOut();
    };

    return <AccountContext.Provider value={{ authenticate, getSession, logout }}>{children}</AccountContext.Provider>;
};

export { Account, AccountContext };
