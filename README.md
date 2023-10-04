# xoconnect
git clone git@bitbucket.org:mellowwallet/xo-connect-react.git



import XoConnect from 'xo-connect';

await XoConnect.getInstance().isAvailable();
await XoConnect.getInstance().connect();