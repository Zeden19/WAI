export const getProfileSlug = (url) => {
    return encodeURIComponent(url).slice(38).slice(0, -3);
}

export const getUserProfileSlug = (email, url) => {
    return `${email}-${getProfileSlug(url)}`
}

export const getLoggedInUser = async (sendResponse) => {
    chrome.storage.local.get("user", async (data) => {
        if (!data.user) {
            sendResponse({error: "You are not signed in. "})
            //todo allow for user to sign in if they aren't then add profile in one single click
            return false
        }

        return data;
    })
}
