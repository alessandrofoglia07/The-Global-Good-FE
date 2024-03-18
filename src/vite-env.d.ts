/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_AWS_POOL_CLIENT_ID: string;
    readonly VITE_AWS_USER_POOL_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}