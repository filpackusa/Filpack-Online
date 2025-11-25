import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Filpack Online - Professional Food Packaging Solutions',
        short_name: 'Filpack Online',
        description: 'America\'s trusted food packaging supplier. Plastic containers, paper boxes, and more.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0f172a',
        icons: [
            {
                src: '/logo.png',
                sizes: 'any',
                type: 'image/png',
            },
        ],
    }
}
