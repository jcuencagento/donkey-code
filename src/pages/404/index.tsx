import NotFoundLayout from "@/layout/notfound";
import Link from "next/link";
import Image from "next/image";

const NotFound = () => {
    return (
        <NotFoundLayout>
            <div className="flex flex-col gap-4 m-auto mt-4 w-full lg:gap-12 lg:mt-8">
                <div className="m-auto">
                    <Image
                        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzA3Ynp0M3UwN3ZvYTZoYzlmZ2ZwZ2M1MWhueHdjMjlzZHJid3JjYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xTiN0L7EW5trfOvEk0/giphy.gif"
                        alt="Not found 404"
                        height={500}
                        width={500}
                    />
                </div>
                <div className="m-auto">
                    <Link aria-label="Home" href="/">
                        <div className="flex items-center cursor-pointer transition-all">
                            <img src="/img/logo.webp" alt="Logo" className="w-8 h-8 lg:w-12 lg:h-12 rounded-lg" />
                            <h1 className="xl:text-3xl text-xl font-bold text-primary hover:text-primary/80 ml-2 mr-2">Go back!</h1>
                        </div>
                    </Link>
                </div>
            </div>
        </NotFoundLayout>
    );
};

export default NotFound;