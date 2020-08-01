const theme = {
  palette: {
    primary: {
      light: '#cd9777',
      main: '#b07d62',
      dark: '#9d6b53',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    },
    typography: {
      useNextVariants: true
    }
  },
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '40px auto 20px auto',
    maxWidth: '100px'
  },
  pageTitle: {
    margin: '10px auto 10px auto'
  },
  textField: {
    margin: '15px auto 15px auto'
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  },
  hRuler: {
    border: 'none',
    margin: 4
  },
  hRulerVisible: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0, 0.1)',
    marginBottom: '20px'
  },
  paper: {
    padding: 50
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
}

theme.profile = {
  '& .image-wrapper': {
    textAlign: 'center',
    position: 'relative',
    '& button': {
      position: 'absolute',
      top: '80%',
      left: '70%'
    }
  },
  '& .profile-image': {
    width: 200,
    height: 200,
    objectFit: 'cover',
    maxWidth: '100%',
    borderRadius: '50%'
  },
  '& .profile-details': {
    textAlign: 'center',
    '& span, svg': {
      verticalAlign: 'middle'
    },
    '& a': {
      color: theme.palette.primary.main
    }
  },
  '& hr': {
    border: 'none',
    margin: '0 0 10px 0'
  },
  '& svg.button': {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}

export default theme
