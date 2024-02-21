import type { NextPage } from "next";

import Up from "@/motions/up";
import Test from "@/components/test";

const Home: NextPage = () => {
    return (
        <div className="flex flex-col items-center justify-center pt-10 pb-20 bg-gradient-to-r transition-all duration-100">
            <Up>
                <h1 className="text-3xl md:text-6xl mb-2 md:mb-5">
                    Typing test and practice
                </h1>
            </Up>
            <Up delay={0.2}>
                <h3 className="text-2xl mb-6 text-gray-400">
                    start typing and register with your account to store and improve your scores
                </h3>
            </Up>
            <Up delay={0.4}>
                <div style={{ width: '120vh' }}>
                    <Test />
                </div>
            </Up>
        </div>
    );
};

export default Home;
