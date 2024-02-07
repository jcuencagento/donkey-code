import {PersonIcon} from "@radix-ui/react-icons";

import {Button} from "@/components/ui/button";

export default function Auth() {
    return (
        <Button variant="ghost">
            <PersonIcon className="mr-2 h-4 w-4" /> Login
        </Button>
    );
}
