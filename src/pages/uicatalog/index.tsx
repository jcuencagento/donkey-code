import { useState, useRef, useEffect } from "react";
import Alert from "@/ui/alert";
import Button from "@/ui/button";
import { Dropdown, DropdownItem } from "@/ui/dropdown";
import IconButton from "@/ui/iconButton";
import { Input } from "@/ui";
import Link from "next/link";
import { BiAnchor, BiBox, BiEqualizer, BiExit, BiMessageSquareEdit, BiPlayCircle } from "react-icons/bi";


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
        <div className="flex-col p-10 w-[60%] m-auto">
            <div className="mb-8">
                <Button onClick={toggleAlert}>Alerta</Button>
            </div>
            <div className="flex gap-4 mb-8">
                <IconButton icon={<BiAnchor size={22} />} />
                Ejemplo botón icono
            </div>
            <div className="mb-8">
                <Input
                    id="filter"
                    type="text"
                    placeholder="Input example"
                    onChange={() => {}}
                />
            </div>
            <div className="mb-8">
                <Dropdown title="Ejemplo Dropdown" className="bg-transparent">
                    <Link href="/dash">
                        <DropdownItem icon={<BiPlayCircle size={17} />}>Type now</DropdownItem>
                    </Link>
                    <Link href="/dash">
                        <DropdownItem icon={<BiBox size={17} />}>Dashboard</DropdownItem>
                    </Link>
                    <a href="https://github.com/jcuencagento/donkey-code/issues/new" target="_blank" rel="noreferrer">
                        <DropdownItem icon={<BiMessageSquareEdit size={17} />} external={true}>
                        Report a bug
                        </DropdownItem>
                    </a>
                    <DropdownItem icon={<BiExit size={17} />}>
                        Sign Out
                    </DropdownItem>
                </Dropdown>
            </div>
            <div className="mb-8">
                <BiEqualizer
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

export default uiCatalog;