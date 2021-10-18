import React, { FC } from 'react';

import Home from './components/Home';

const orgCodes = ['facebook', 'airbnb', 'netflix'];
const EnhancedHome: FC = () => <Home orgCodes={orgCodes} />;

export default EnhancedHome;
