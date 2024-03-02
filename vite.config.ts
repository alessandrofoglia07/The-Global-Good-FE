import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA, ManifestOptions } from 'vite-plugin-pwa';

const manifest: Partial<ManifestOptions> = {
    name: 'Modern React Vite App',
    short_name: 'React Vite',
    description: 'React Vite Starter',
    icons: [
        {
            src: '/app-icon.png',
            sizes: '512x512',
            type: 'image/png'
        },
        {
            src: '/app-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
        }
    ],
    start_url: '/',
    display: 'standalone',
    theme_color: '#000000',
    background_color: '#ffffff'
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            manifest,
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'assets/*'],
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}']
            }
        })
    ],
    resolve: {
        alias: {
            '@': '/src'
        }
    },
    server: {
        watch: {
            usePolling: true
        },
        host: '0.0.0.0',
        strictPort: true,
        port: 3000
    }
});
