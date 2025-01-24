import account from "@/assets/account.png";
import { ModeToggle } from "@/components/ModeToggle.jsx";

function Nav() {
    return (<nav className={"flex justify-between items-center bg-gray-900 border-b-2 bg-secondary py-1 px-7"}>
        <div>Wai Finance Logo</div>
        <div className={"flex gap-9"}>
            <a>Your Profiles</a>
            <a>Shared Profiles</a>
        </div>
        <div className={'flex gap-4 items-center'}>
            <ModeToggle/>
            <img className={"max-w-full h-11 flex-shrink"} alt={"Account Menu"} src={`${account}`} /></div>
    </nav>);
}

export default Nav;