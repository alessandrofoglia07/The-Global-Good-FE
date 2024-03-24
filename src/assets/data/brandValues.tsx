import { IconType } from 'react-icons';
import { FaRegHandshake as HandShakeIcon, FaHammer as HammerIcon, FaRegLightbulb as LightBulbIcon } from 'react-icons/fa';
import { LuRecycle as RecycleIcon } from 'react-icons/lu';

interface Value {
    icon: IconType;
    title: string;
    description: string;
}

export const values: Value[] = [
    {
        icon: HandShakeIcon,
        title: 'People over Profit',
        description:
            'We prioritize the well-being of producers and artisans. We ensure fair wages, safe working conditions, and empower communities through sustainable trade practices.'
    },
    {
        icon: RecycleIcon,
        title: 'Environmental Responsibility',
        description: 'We minimize our environmental footprint by offering eco-conscious products, using sustainable packaging, and offsetting our carbon emissions.'
    },
    {
        icon: HammerIcon,
        title: 'Global Craftsmanship',
        description:
            'We celebrate the unique skills and traditions of artisans around the world. We offer a curated selection of handcrafted goods that tell a story and promote cultural heritage.'
    },
    {
        icon: LightBulbIcon,
        title: 'Empowering Conscious Consumers',
        description: 'We believe in the power of informed choices. We provide detailed information about our products and their origins, allowing you to shop with a conscience.'
    }
];
