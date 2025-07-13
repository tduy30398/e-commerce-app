import { AppSidebar } from "@/components/templates/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-col flex-1 p-6">
                {children}
            </main>
        </SidebarProvider>
    )

}

export default Layout;