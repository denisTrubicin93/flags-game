import React, { FC } from 'react';
import { GridList, Card, CardContent, CardHeader, Avatar, Typography, Breadcrumbs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { User } from '../../../features/sample/models';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    margin: '5px'
  },
  members: {
    margin: `2em 1.5em`
  },
  id: {
    fontSize: '12px'
  }
});

export interface Props {
  orgCode: string;
  users: User[];
  isLoading?: boolean;
}

const Members: FC<Props> = ({
  orgCode = '<組織名>',
  users = [],
  isLoading = false,
}) => {
  const title = `${orgCode}の開発メンバー`;
  const classes = useStyles();

  return (
    <>
    <Breadcrumbs aria-label="breadcrumb">
      <Link to={'/menu'} style={{color: 'white'}}>
        メニュー
      </Link>
      <Link color="inherit" to={'/Sample'} style={{color: 'white'}}>
        ゲーム
      </Link>
    </Breadcrumbs>
      <div className={classes.members} data-test="users">
        <h2>{title}</h2>
        {isLoading ? (
          <Spinner />
        ) : (
          <GridList cols={4} cellHeight={120}>
            {users.map(user => (
              <Card
                key={user.id}
                className={classes.root}
              >
                <CardContent>
                  <CardHeader
                    title={user.login}
                    avatar={
                      <Avatar src={user.avatarUrl} />
                    }
                  />
                  <Typography component="p" className={classes.id}>
                    GitHub ID: {user.id}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </GridList>
        )}
      </div>
    </>
  );
};

export default Members;
