export const getProfileSlug = (url: string): string => {
  return encodeURIComponent(url).slice(38).slice(0, -3);
};

export const getUserProfileSlug = (email: string, url: string): string => {
  return `${email}-${getProfileSlug(url)}`;
};

export const getLoggedInUser = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('user', async data => {
      if (!data.user) {
        console.error('Could not find user');
        reject({ error: 'You are not signed in' });
        //todo allow for user to sign in if they aren't then add profile in one single click
      } else {
        resolve(data.user);
      }
    });
  });
};

export const sanitizeURL = (url: string): string => {
  // Sanitizing URL (dropping search params)
  const urlObject = new URL(url);
  urlObject.search = '';
  return urlObject.toString();
};

export const getCurrentTabUrl = async (): Promise<string> => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!tab.url) {
    return '';
  }
  return sanitizeURL(tab.url);
};
