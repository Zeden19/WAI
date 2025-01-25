import { useParams } from "react-router";
import { getUserFromId as getUserFromIdDB } from "@/lib/firebaseFunctions.js";
import { useEffect, useState } from "react";

function UserPage() {
    const { userId } = useParams();
    const [userOnPage, setUserOnPage] = useState(null);

    useEffect(() => {
        async function getUserFromId() {
            setUserOnPage(await getUserFromIdDB(userId));
        }
        getUserFromId();
    }, []);
    return (
      <>
          {userOnPage ? (`page for ${userOnPage.email}`) : "no data"}

      </>
    );
}

export default UserPage;