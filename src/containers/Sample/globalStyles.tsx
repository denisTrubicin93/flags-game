export const globalStyles = {
  global: {
    '& *': {
      boxSizing: 'border-box',
      userSelect: 'none',
      mozUserSelect: 'none',
      color: 'white',
    },
    '& html, body, & :global(#root), :global(#root) > div': {
      width: '100%',
      height: '100%',
      margin: '0',
      padding: '0',
      overflowX: 'hidden'
    },
    '& body': {
      fontFamily: 'system-ui'
    },
    '& ul': {
      listStyle: 'none',
      margin: '0',
      padding: '0'
    },
    '& .container': {
      padding: '40px 25px'
    },
    '& .backBtn': {
      position: 'fixed',
      top: 25,
      left: 25,
      zIndex: '1000',
      padding: '4px 10px',
      background: '#fff',
      border: '1px solid #ccc',
      fontSize: '0.9em',
      textDecoration: 'none'
    },
    '& .list li': {
      margin: '10px 0',
      textTransform: 'capitalize'
    },
    '& :global(.flex)': {
      width: '100%',
      height: '100%',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    '& a[target]': {
      fontSize: '0.8em',
      marginLeft: '1em',
      display: 'inline-block',
      textDecoration: 'none',
      color: 'white',
    }
  }
};
