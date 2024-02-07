import {LightningBoltIcon, MoonIcon, SunIcon, EyeOpenIcon} from "@radix-ui/react-icons";
import {toast} from "sonner";

import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";

// eslint-disable-next-line @typescript-eslint/ban-types
export default function Theme({setTheme}: {setTheme: Function}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <LightningBoltIcon className="mr-2 h-4 w-4" /> Theme
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-200 sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Choose your theme</DialogTitle>
                    <DialogDescription>More themes to come...</DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-between">
                    <Label className="text-md font-bold" htmlFor="dark-theme">
                        Dark theme
                    </Label>
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2 rounded-lg border border-black bg-gray-300 p-1">
                            <div className="circle h-5 w-5 rounded-full border border-black bg-gray-800" />
                            <div className="circle h-5 w-5 rounded-full border border-black bg-indigo-600" />
                            <div className="circle h-5 w-5 rounded-full border border-black bg-purple-700" />
                        </div>
                        <DialogClose asChild className="m-0">
                            <Button
                                type="submit"
                                variant="destructive"
                                onClick={() => {
                                    setTheme("dark");
                                    toast("Dark theme activated!");
                                }}
                            >
                                <span className="sr-only">Dark Theme</span>
                                <MoonIcon className="h-4 w-4" />
                            </Button>
                        </DialogClose>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <Label className="text-md font-bold" htmlFor="light-theme">
                        Light theme
                    </Label>
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2 rounded-lg border border-black bg-gray-300 p-1">
                            <div className="circle h-5 w-5 rounded-full border border-black bg-yellow-200" />
                            <div className="circle h-5 w-5 rounded-full border border-black bg-blue-200" />
                            <div className="circle h-5 w-5 rounded-full border border-black bg-pink-200" />
                        </div>
                        <DialogClose asChild className="m-0">
                            <Button
                                type="submit"
                                variant="destructive"
                                onClick={() => {
                                    setTheme("light");
                                    toast("Light theme activated!");
                                }}
                            >
                                <span className="sr-only">Light Theme</span>
                                <SunIcon className="h-4 w-4" />
                            </Button>
                        </DialogClose>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <Label className="text-md font-bold" htmlFor="neutral-theme">
                        Neutral theme
                    </Label>
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2 rounded-lg border border-black bg-gray-300 p-1">
                            <div className="circle bg-taupe-400 h-5 w-5 rounded-full border border-black" />
                            <div className="circle h-5 w-5 rounded-full border border-black bg-red-300" />
                            <div className="circle h-5 w-5 rounded-full border border-black bg-teal-500" />
                        </div>
                        <DialogClose asChild className="m-0">
                            <Button
                                type="submit"
                                variant="destructive"
                                onClick={() => {
                                    setTheme("neutral");
                                    toast("Neutral theme activated!");
                                }}
                            >
                                <span className="sr-only">Neutral Theme</span>
                                <EyeOpenIcon className="h-4 w-4" />
                            </Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
