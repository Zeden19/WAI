import { useParams } from "react-router";
import { getProfileFromId as getProfileFromIdDB } from "@/lib/firebaseFunctions.js";
import { useEffect, useState } from "react";
import { getNameFromLink } from "@/lib/utils.ts";

function ProfilePage() {
    const { profileId } = useParams();
    const [profileOnPage, setProfileOnPage] = useState(null);

    useEffect(() => {
        async function getProfileFromId() {
            setProfileOnPage(await getProfileFromIdDB(profileId));
        }
        getProfileFromId();
    }, []);
    return (
      <>
          {profileOnPage ? (`page for ${getNameFromLink(profileOnPage.link)}`) : "no data"}

      </>
    );
}

export default ProfilePage;