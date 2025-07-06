interface NavigateListProps {
    title: string;
    link: string
}

interface StatisticsProps {
    quantity: number;
    title: string
}

export const navigateList: NavigateListProps[] = [
    {
        title: 'Trending',
        link: '/trending'
    },
    {
        title: 'New Arrivals',
        link: '/new'
    },
    {
        title: 'Download',
        link: '/app'
    }
];

export const statistics: StatisticsProps[] = [
    {
        quantity: 200,
        title: 'International Brands'
    },
    {
        quantity: 2000,
        title: 'Quality Products'
    },
    {
        quantity: 30000,
        title: 'Happy Customers'
    }
];

export const partnerLogos = [
    { name: "Versace", logo: '/images/partners/versace.png' },
    { name: "Zara", logo: '/images/partners/zara.png' },
    { name: "Gucci", logo: '/images/partners/gucci.png' },
    { name: "Prada", logo: '/images/partners/prada.png' },
    { name: "Calvin", logo: '/images/partners/calvin.png' },
];