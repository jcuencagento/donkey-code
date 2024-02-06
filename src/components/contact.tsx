import {CopyIcon, IdCardIcon} from "@radix-ui/react-icons";

import {Button} from "@/components/ui/button";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {Input} from "@/components/ui/input";

import {Label} from "@/components/ui/label";

import {toast} from "sonner";

export default function Contact() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <IdCardIcon className="mr-2 h-4 w-4" /> Contact  
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Email contact</DialogTitle>
                    <DialogDescription> Write up for whatever. </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input readOnly defaultValue="jcuencagento@gmail.com" id="email" />
                    </div>
                    <Button
                        className="px-3"
                        size="sm"
                        type="submit"
                        onClick={() => {
                            navigator.clipboard.writeText("jcuencagento@gmail.com");
                            toast("Copied to clipboard!");
                        }}
                    >
                        <span className="sr-only">Copy</span>
                        <CopyIcon className="h-4 w-4" />
                    </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="destructive">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}