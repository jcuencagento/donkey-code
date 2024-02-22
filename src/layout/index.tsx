import Footer from "@/components/footer";
import Header from "@/components/header";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow overflow-y max-h-[calc(100vh-4rem)]">{props.children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
