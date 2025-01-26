import { getNameFromLink } from "@/lib/utils.ts";
import useGlobalStore from "@/store.js";

function ProfilePage() {
    const profileOnPage = useGlobalStore(state => state.selectedProfile)

    // If we don't want this weird state hack, we'd have to go back to this
    //  const { profileId } = useParams();
    // const [profileOnPage, setProfileOnPage] = useState(null);
    //
    // useEffect(() => {
    //     async function getProfileFromId() {
    //         setProfileOnPage(await getProfileFromIdDB(profileId));
    //     }
    //     getProfileFromId();
    // }, []);
    return (
      <>
          {profileOnPage ? (`page for ${getNameFromLink(profileOnPage.link)}`) : "no data"}
      </>
    );
}

export default ProfilePage;