import Hero from '@/components/home/Hero';
import StatsCards from '@/components/home/StatsCards';
import ActivityPreview from '@/components/home/ActivityPreview';

export default function Home() {
    return (
        <main>
            <Hero />
            <StatsCards />
            <ActivityPreview />
        </main>
    );
}
