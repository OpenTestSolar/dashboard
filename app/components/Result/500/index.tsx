import React from 'react';
import ErrorPage from '@/app/components/ErrorPage';

const ServerError = () => <ErrorPage code={500} />;

export default React.memo(ServerError);
