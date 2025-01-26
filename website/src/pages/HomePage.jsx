import {
    getUserProfiles as getUserProfilesDB,
    getSharedProfiles as getSharedProfilesDB
} from "@/lib/firebaseFunctions.js";
import { useEffect, useState } from "react";
import ProfilesTable from "@/components/ProfilesTable.jsx";
import useGlobalStore from "@/store.js";

function HomePage() {
    const user = useGlobalStore((state) => state.user);

    const [profiles, setProfiles] = useState(null);
    const [sharedProfiles, setSharedProfiles] = useState(null);

    useEffect(() => {
        if (user) {
            async function getUserProfiles() {
                const data = await getUserProfilesDB(user);
                setProfiles(data);
            }

            async function getSharedProfiles() {
                const data = await getSharedProfilesDB(user);
                setSharedProfiles(data);
            }

            getUserProfiles();
            getSharedProfiles();

        } else {
            setProfiles(null);
            setSharedProfiles(null);
        }
    }, [user]);

    return (
      <div className={"flex justify-around "}>
          {user ? <>
              <div>
                  <h2 className={"font-bold text-3xl mb-2"}>Your Profiles</h2>
                  <ProfilesTable profiles={profiles} />
              </div>
              <div>
                  <h2 className={"font-bold text-3xl mb-2"}>Shared Profiles With You</h2>
                  <ProfilesTable profiles={sharedProfiles} shareProfiles={true} />
              </div>
          </> : "Log in to continue"}
      </div>
    )
}

export default HomePage;