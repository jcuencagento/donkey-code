import { toastStyles } from "@/styles/toast";
import { Input } from "@/ui";
import IconButton from "@/ui/iconButton";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { BiClipboard } from "react-icons/bi";
import { BsMailbox } from "react-icons/bs";

const Contact = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsModalOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <BsMailbox size={20} className="transition-colors duration-100 hover:text-primary cursor-pointer" onClick={toggleModal}/>
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center" style={{ marginLeft: '0' }}>
                    <div ref={modalRef} className="flex-col bg-white p-8 rounded-lg justify-center align-center m-auto">
                        <h2 className="text-lg font-bold mb-2 text-gray-800">Email contact</h2>
                        <h6 className="text-sm font-light mb-6 text-gray-600">Write up for whatever</h6>
                        <div className="flex gap-4 justify-between align-center">
                            <Input id="email" defaultValue="jcuencagento@gmail.com" readOnly />
                            <IconButton
                                aria-label="Clipboard"
                                className="m-auto"
                                icon={<BiClipboard size={28} />}
                                onClick={ () => {
                                    navigator.clipboard.writeText('jcuencagento@gmail.com');
                                    toast("Copied to clipboard.", { icon: "✂️", style: toastStyles });
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Contact;
