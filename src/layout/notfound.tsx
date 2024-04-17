interface NotFoundLayoutProps {
    children: React.ReactNode;
}

const NotFoundLayout = (props: NotFoundLayoutProps) => {
    return (
        <div className="pb-24 overflow-auto">
            <div className="border-b-2 border-zinc-800 mt-8" />
            <div className="container mx-auto pl-4 pr-4 md:pl-0 md:pr-0">
                {props.children}
            </div>
        </div>
    );
};

export default NotFoundLayout;