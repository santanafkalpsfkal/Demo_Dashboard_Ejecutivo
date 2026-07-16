import React from 'react';
import AppHeader from './AppHeader';

/** Header legacy — delega al header ejecutivo */
export default function Header(props) {
  return <AppHeader {...props} />;
}
