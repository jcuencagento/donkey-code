import Up from "@/motions/up";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = (props: DashboardLayoutProps) => {
    return (
        <div className="pb-24 overflow-auto">
            <div className="border-b-2 border-zinc-800 mt-1">
                <div className="container pl-4 pr-4 md:pl-0 md:pr-0 mx-auto pb-3 flex items-center justify-around">
                    <Up>
                        <h1 className="text-2xl text-primary">Dashboard</h1>
                    </Up>
                </div>
            </div>
            <Up delay={0.4}>
                <div className="container mx-auto pl-4 pr-4 md:pl-0 md:pr-0">
                    {props.children}
                </div>
            </Up>
        </div>
    );
};

export default DashboardLayout;
