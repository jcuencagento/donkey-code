interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = (props: DashboardLayoutProps) => {
    return (
        <div className="pb-24 overflow-auto">
            <div className="border-b-2 border-zinc-800 mt-1">
                <div className="container pl-4 pr-4 md:pl-0 md:pr-0 mx-auto pb-3 flex items-center justify-around">
                    <h1 className="text-2xl text-primary">Dashboard</h1>
                </div>
            </div>
            <div className="container mx-auto pl-4 pr-4 md:pl-0 md:pr-0">
                {props.children}
            </div>
        </div>
    );
};

export default DashboardLayout;
