import { useState } from "react";
import toast from "react-hot-toast";
import { toastStyles } from "@/styles/toast";
import { BiMoon } from "react-icons/bi";

const Theme = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState("light"); // Default theme

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleThemeSelection = (theme) => {
        setSelectedTheme(theme);
        toggleModal();
        toast(`Theme changed to ${theme}`, { icon: "⚡", style: toastStyles });
    };

    return (
        <>
            <BiMoon
                size={22}
                className="mr-4 cursor-pointer text-gray-400 transition duration-200 ease-in-out hover:scale-110 hover:transform hover:text-gray-100"
                onClick={toggleModal}
            />
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center">
                    <div className="flex-col bg-white p-8 rounded-lg justify-center align-center m-auto">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800 mb-4">Choose Theme</h2>
                        <div className="flex justify-between">
                            <button onClick={() => handleThemeSelection("light")} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 ml-2">Light</button>
                            <button onClick={() => handleThemeSelection("dark")} className="px-4 py-2 bg-gray-800 text-white rounded-md mr-2 ml-2">Dark</button>
                            <button onClick={() => handleThemeSelection("neutral")} className="px-4 py-2 bg-red-400 text-white rounded-md mr-2 ml-2">Neutral</button>
                            {/* Add more theme options as needed */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Theme;
