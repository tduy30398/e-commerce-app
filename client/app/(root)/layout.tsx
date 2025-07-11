import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )

}

export default Layout;