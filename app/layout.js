import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'OSIS SMKN 56 JAKARTA',
    description: 'Mewujudkan Organisasi yang Aktif & Transparan',
};

export default function RootLayout({ children }) {
    return (
        <html lang="id">
            <body className={inter.className}>
                <ThemeProvider>
                    <Navbar />
                    {children}
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
