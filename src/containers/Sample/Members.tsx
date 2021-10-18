import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import Members from './components/Members';
import { getMembersStarted } from '../../features/Sample/reducer';
import { RootState } from '../../features';
import { User } from '../../features/Sample/models';

const EnhancedMembers: FC = () => {
  const { orgCode = '' } = useParams<{ orgCode: string }>();
  const dispatch = useDispatch();
  const users = useSelector<RootState, User[]>((state) => state.sample.users);
  const isLoading = useSelector<RootState, boolean>((state) => state.sample.isLoading);

  useEffect(() => {
    dispatch(getMembersStarted({ orgCode }));
  }, [orgCode, dispatch]);

  return <Members {...{ orgCode, users, isLoading }} />;
};

export default EnhancedMembers;
