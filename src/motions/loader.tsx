import { Ring } from "@uiball/loaders";

interface LoaderProps {
    className?: string;
}

const Loader = (props: LoaderProps) => {
    return (
        <div className={`${props.className}`}>
            <Ring size={24} speed={2} color="orange" lineWeight={5} />
        </div>
    );
};

export default Loader;
