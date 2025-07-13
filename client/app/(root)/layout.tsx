import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <main>
            <Header />
            {children}
            <Footer />
        </main>
    )

}

export default Layout;