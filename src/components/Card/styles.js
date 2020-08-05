import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  cart: {
    fontSize: '1.2em',
    margin: '1.5% 0.8%',
    padding: 0,
    width: 225,

    '& a': {
      textDecoration: 'none',
    },
  },
  avatar: {
    width: '100%',
    height: 100,
    objectFit: 'cover',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  description: {
    fontSize: 'inherit',
    lineHeight: '1.2em',
  },
});

export default useStyles;
