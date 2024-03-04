import { CognitoUserPool } from "amazon-cognito-identity-js";

const UserPoolId = import.meta.env.VITE_AWS_USER_POOL_ID;
const ClientId = import.meta.env.VITE_AWS_POOL_CLIENT_ID;

if (!UserPoolId || !ClientId) {
    throw new Error('UserPoolId and ClientId are required');
}

export default new CognitoUserPool({ UserPoolId, ClientId });