import React, { useEffect } from 'react';

import { Redirect } from 'react-router-dom';

//useEffect is used to insure the promise resolves in the signOut action in context before signing out and redirects to homepage. 
const UserSignOut =  ({context}) => {
    useEffect(() => {
      context.actions.signOut();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );
  return (
    <Redirect to="/" />
  );
}
export default UserSignOut;