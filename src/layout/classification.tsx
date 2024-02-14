interface ClassificationLayoutProps {
    children: React.ReactNode;
}

const ClassificationLayout = (props: ClassificationLayoutProps) => {
    return (
        <>
            <div className="border-b-2 border-zinc-800 mt-1">
                <div className="container pl-4 pr-4 md:pl-0 md:pr-0 mx-auto pb-3 flex items-center justify-around">
                    <h1 className="text-2xl">Classification</h1>
                </div>
            </div>
            <div className="container mx-auto pl-4 pr-4 md:pl-0 md:pr-0">
                {props.children}
            </div>
        </>
    );
};

export default ClassificationLayout;