import useGlobalStore from "@/store.js";

function UserPage() {
    const userOnPage = useGlobalStore(state => state.user);
    return (
      <>
          {userOnPage ? (`page for ${userOnPage.email}`) : "no data"}

      </>
    );
}

export default UserPage;