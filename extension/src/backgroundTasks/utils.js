export const getProfileSlug = (url) => {
    return encodeURIComponent(url).slice(38).slice(0, -3);
};

export const getUserProfileSlug = (email, url) => {
    return `${email}-${getProfileSlug(url)}`;
};

export const getLoggedInUser = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("user", async (data) => {
            if (!data.user) {
                console.error("Could not find user");
                reject({ error: "You are not signed in" });
                //todo allow for user to sign in if they aren't then add profile in one single click
            } else {
                resolve(data);
            }
        });
    });
};

export const sanitizeURL = (url) => {
    // Sanitizing URL (dropping search params)
    const urlObject = new URL(url);
    urlObject.search = "";
    return urlObject.toString();
};

export const getCurrentTabUrl = async () => {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });
    return sanitizeURL(tab.url);
};
