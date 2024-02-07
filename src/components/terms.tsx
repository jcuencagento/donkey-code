import {LockClosedIcon, LockOpen1Icon} from "@radix-ui/react-icons";

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

export default function Terms() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <LockClosedIcon className="mr-2 h-4 w-4" /> Terms
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex">
                        <LockOpen1Icon className="mr-4 h-4 w-4" />
                        Terms & Privacy
                    </DialogTitle>
                    <DialogDescription>
                        This complete project is open source and done without any condition by Javier Cuenca Gento.
                        GitHub code in next button on the footer.
                    </DialogDescription>
                </DialogHeader>
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
