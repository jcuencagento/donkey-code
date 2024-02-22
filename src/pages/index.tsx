import type { NextPage } from "next";

import Up from "@/motions/up";
import Test from "@/components/test";

const Home: NextPage = () => {
    return (
        <div className="flex flex-col items-center justify-center pt-4 xl:pt-8 h-full overflow-hidden bg-gradient-to-r transition-all duration-100">
            <Up>
                <h1 className="text-2xl lg:text-4xl mb-2 lg:mb-5">
                    Typing test and practice
                </h1>
            </Up>
            <Up delay={0.2}>
                <h3 className="text-sm lg:text-2xl align-center justify-center mb-6 xl:mb-10 text-gray-400">
                    move your hands!
                </h3>
            </Up>
            <Up delay={0.4}>
                <div className="w-full">
                    <Test />
                </div>
            </Up>
        </div>
    );
};

export default Home;
