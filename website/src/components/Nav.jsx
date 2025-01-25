import account from "@/assets/account.png";
import { ModeToggle } from "@/components/ModeToggle.jsx";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import { getLoggedInUser, signIn as signInWithGoogle, signOut as signOutFromGoogle } from "@/lib/firebaseFunctions.js";
import { useState } from "react";
import { toast } from "sonner";


function Nav() {
    const [user, setUser] = useState(getLoggedInUser);

    async function signIn() {
        const result = await signInWithGoogle();
        if (!result) {
            toast.error("Could not sign in");
            return;
        }
        setUser(result);
        toast.success("Successfully signed in");
    }

    function signOut() {
        signOutFromGoogle();
        setUser(null);
        toast.success("Successfully signed out");
    }


    return (<nav className={"flex justify-between items-center bg-gray-900 border-b-2 bg-secondary py-1 px-7"}>
        <div>Wai Finance Logo</div>
        <div className={"flex gap-9"}>
            <a className={"cursor-pointer"}>Your Profiles</a>
            <a className={"cursor-pointer"}>Shared Profiles</a>
        </div>
        <div className={"flex gap-4 items-center"}>
            <ModeToggle />
            {user && user.displayName}
            <DropdownMenu>
                <DropdownMenuTrigger><img className={"max-w-full h-11 flex-shrink"} alt={"Account Menu"}
                                          src={`${account}`} /></DropdownMenuTrigger>
                <DropdownMenuContent>
                    {!user ? <DropdownMenuItem onClick={signIn}>Sign in</DropdownMenuItem> :
                      <>
                          <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Profile</DropdownMenuItem>
                          <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
                      </>
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </nav>);
}

export default Nav;