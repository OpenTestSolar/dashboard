import React from 'react';
import ErrorPage from '@/app/components/ErrorPage';

const UnAuthorized = () => <ErrorPage code={403} />;

export default React.memo(UnAuthorized);
