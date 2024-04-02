import { PropsWithChildren, createContext } from 'react';
import { localStorageUserPool, sessionStorageUserPool } from '@/utils/userPool';
import { AuthenticationDetails, CognitoUser, CognitoUserSession, ICognitoStorage } from 'amazon-cognito-identity-js';
import { PasswordSchema } from '@/utils/schemas/authSchemas';

type IAuthContext = {
    authenticate: (Username: string, Password: string, Storage: ICognitoStorage) => Promise<CognitoUserSession>;
    getSession: () => Promise<CognitoUserSession | null>;
    isAdmin: () => Promise<boolean>;
    logout: () => void;
};

const AccountContext = createContext<IAuthContext>({} as IAuthContext);

const Account = ({ children }: PropsWithChildren) => {
    const getSession = async () => {
        return await new Promise<CognitoUserSession | null>((resolve, reject) => {
            let user = localStorageUserPool.getCurrentUser();
            if (!user && localStorage.getItem('rememberMe') === '1') {
                user = sessionStorageUserPool.getCurrentUser();
            } else {
                localStorage.removeItem('rememberMe');
            }
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
                if (Storage === sessionStorage) {
                    localStorage.setItem('rememberMe', '1');
                } else {
                    localStorage.removeItem('rememberMe');
                }
                const cognitoUser = new CognitoUser({ Username: UsernameOrEmail, Pool: Storage === localStorage ? localStorageUserPool : sessionStorageUserPool, Storage });

                const authenticationDetails = new AuthenticationDetails({ Username: UsernameOrEmail, Password });

                cognitoUser.authenticateUser(authenticationDetails, {
                    onSuccess: (data) => resolve(data),
                    onFailure: (err) => reject(err)
                });
            }
        });
    };

    const isAdmin = async () => {
        const adminUsersGroup = import.meta.env.VITE_AWS_ADMIN_GROUP_NAME || 'admin-users';
        try {
            const session = await getSession();
            if (!session) return false;
            return session.getIdToken().payload['cognito:groups']?.includes(adminUsersGroup) || false;
        } catch (err) {
            throw new Error(err as string);
        }
    };

    const logout = () => {
        let user = localStorageUserPool.getCurrentUser();
        if (!user && localStorage.getItem('rememberMe') === '1') {
            user = sessionStorageUserPool.getCurrentUser();
        } else {
            localStorage.removeItem('rememberMe');
        }
        if (user) user.signOut();
    };

    return <AccountContext.Provider value={{ authenticate, getSession, logout, isAdmin }}>{children}</AccountContext.Provider>;
};

export { Account, AccountContext };
