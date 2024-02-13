import { useState, useRef, useEffect } from "react";
import Alert from "@/ui/alert";
import Button from "@/ui/button";
import { Dropdown } from "@/ui/dropdown";
import IconButton from "@/ui/iconButton";
import { Input } from "@/ui";
import { BiCodeAlt, BiMoon } from "react-icons/bi";


const uiCatalog = () => {
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

    const toggleAlert = () => {
        <Alert>
            <p><strong>Alerta</strong></p>
        </Alert>
    }

    return (
        <div className="grid gap-2">
            <Button onClick={toggleAlert}>Alerta</Button>
            <Dropdown></Dropdown>
            <IconButton icon={<BiCodeAlt size={22} />} />
            <Input
                id="filter"
                type="text"
                placeholder="Example"
                onChange={() => {}}
            />
            <div>
                <BiMoon
                    size={22}
                    className="mr-4 cursor-pointer text-gray-100 transition duration-200 ease-in-out hover:scale-110 hover:transform"
                    onClick={toggleModal}
                />
                {isModalOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center" style={{ marginLeft: '0' }}>
                        <div ref={modalRef} className="flex-col bg-white p-8 rounded-lg justify-center align-center m-auto">
                            <h2 className="text-lg font-semibold mb-4 text-gray-800 mb-4">Modal example</h2>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}