import '@src/Popup.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import { useEffect, useState } from 'react';

const Popup = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [user, setUser] = useState<chrome.identity.UserInfo | null>(null);

  useEffect(() => {
    chrome.storage.local.get('user', data => {
      if (data.user) {
        setIsSignedIn(true);
        setUser(data.user);
      } else {
        setIsSignedIn(false);
        setUser(null);
      }
    });
  }, []);

  const handleSignin = async () => {
    console.log('HIIIIII');
    const data = await chrome.runtime.sendMessage({ message: 'signIn' }); // background.js saves user to local storage
  };

  const handleSignout = () => {
    // Remove user data from chrome local storage
    chrome.storage.local.remove('user', () => {
      console.log('User logged out and removed from storage.');
    });
  };

  return (
    <div className="bg-white h-full w-full App">
      {isSignedIn ? (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
          <h1 className="text-xl font-semibold text-gray-800">Welcome, {user?.id}</h1>
          <p className="text-gray-600">Email: {user?.email}</p>
        </div>
      ) : (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
          <h1 className="text-xl font-semibold text-gray-800">Please Sign In</h1>
        </div>
      )}
      <button
        onClick={isSignedIn ? handleSignout : handleSignin}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300">
        {isSignedIn ? 'Sign Out' : 'Sign In'}
      </button>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
