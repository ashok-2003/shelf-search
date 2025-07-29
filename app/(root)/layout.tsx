import { Providers } from "../providers";
import clsx from "clsx";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="flex-grow w-full px-6 pt-16">
                {children}
            </main>
            <footer className="flex items-center justify-center w-full py-3">
                footer
            </footer>
        </div>
    );
}
