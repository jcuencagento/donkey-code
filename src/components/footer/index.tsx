import { BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="fixed bottom-0 mt-6 mb-6 w-full text-gray-500">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-1">
        <p>Javier Cuenca Gento © {new Date().getFullYear()} Donkey Code</p>
        </div>
        <a href="https://github.com/jcuencagento" target="_blank" rel="noreferrer">
          <BsGithub
            size={18}
            className="transition-colors duration-100 hover:text-white"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
