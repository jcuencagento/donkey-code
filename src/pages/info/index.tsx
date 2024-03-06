import InfoLayout from "@/layout/info";

const Info = () => {
    return (
        <InfoLayout>
            <div className="flex">
                <h1 className="flex m-auto lg:text-2xl text-purple-400 mb-8 mt-8">Still in <p className="ml-2 text-red-300"> development </p>... wait for it</h1>
            </div>
        </InfoLayout>
    );
};

export default Info;