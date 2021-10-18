import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PeopleIcon from '@material-ui/icons/People';
import TouchAppIcon from '@material-ui/icons/TouchApp';

const useStyles = makeStyles({
  root: {
    marginTop: '50px',
    marginLeft: '100px',
    '& *': {
      color: 'white',
    }
  },
  listItem: {
    padding: `0.2em 0 !important`,
  }
});

const Home: FC<{ orgCodes: string[] }> = ({ orgCodes = [] }) => {
  const classes = useStyles();

  return (
  <>
    <Breadcrumbs aria-label="breadcrumb">
      <Link to={'/menu'} style={{color: 'white'}}>
        メニュー
      </Link>
    </Breadcrumbs>
    <List className={classes.root}
      subheader={
        <ListSubheader component="div" id="list-subheader" style={{ fontSize: '1.5rem' }}>
          外部API呼び出しサンプル
        </ListSubheader>
      }
    >
      {orgCodes.map(orgCode => (
        <ListItem className={classes.listItem} key={orgCode}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText>
            <Link to={`/${orgCode}/members`}>
              {orgCode}のメンバー
            </Link>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  </>
)};

export default Home;
