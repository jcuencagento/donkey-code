import { BsGithub } from "react-icons/bs";

const Footer = () => {
    return (
        <div className="fixed bottom-0 mt-6 mb-20 w-full text-gray-500">
            <div className="flex items-center justify-center gap-2">
                <div className="flex items-center gap-1">
                    <span style={{ margin: '0', border: '1px solid #ccc', borderRadius: '4px', padding: '4px 8px', background: '#f0f0f0', fontSize: '10px' }}>Ctrl</span>
                    <p style={{ fontSize: '12px' }}>+</p>
                    <span style={{ margin: '0', border: '1px solid #ccc', borderRadius: '4px', padding: '4px 8px', background: '#f0f0f0', fontSize: '10px' }}>K</span>
                </div>
                to open Commands
            </div>
            <div className="fixed bottom-0 mt-6 mb-6 w-full text-gray-500">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                        <p>Javier Cuenca Gento © {new Date().getFullYear()} Donkey Code</p>
                    </div>
                    <a href="https://github.com/jcuencagento" target="_blank" rel="noreferrer">
                        <BsGithub size={18} className="transition-colors duration-100 hover:text-white" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
