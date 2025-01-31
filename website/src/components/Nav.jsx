import account from "@/assets/account.png";
import { ModeToggle } from "@/components/ModeToggle.jsx";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {signIn as signInWithGoogle, signOut as signOutFromGoogle } from "@/lib/firebaseFunctions.js";
import { toast } from "sonner";
import { NavLink, Outlet } from "react-router";
import { Link } from "react-router";
import useGlobalStore from "@/store.js";


function Nav() {
    const user = useGlobalStore((state) => state.user);
    const setUser = useGlobalStore((state) => state.setUser);

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
        setUser(undefined);
        toast.success("Successfully signed out");
    }

    return (
      <>
          <nav className={"flex justify-between items-center bg-gray-900 border-b-2 bg-secondary py-1 px-7 mb-7"}>
              <div className={"flex gap-9"}>
                  <NavLink className={"mr-7"} to={"/"}>Wai Finance Logo</NavLink>
                  <NavLink to={"/"}>Home</NavLink>
                  <NavLink className={"cursor-pointer"} to={"/contact"}>Contact</NavLink>
              </div>

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
                                <DropdownMenuItem><Link to={`/user/${user.email}`}>User Page</Link></DropdownMenuItem>
                                <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
                            </>
                          }
                      </DropdownMenuContent>
                  </DropdownMenu>
              </div>
          </nav>
          <Outlet />
      </>);
}

export default Nav;