import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

//MUI STUFF
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

//Util
import Appicon from '../images/logo192.png'
import themeObject from '../util/theme'

//Redux
import { connect } from 'react-redux';
import { signUpUser } from '../redux/actions/userActions';

const styles = themeObject

class signup extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      errors: {}
    }
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.UI.errors) this.setState({ errors: nextProps.UI.errors });
  }
  handleSubmit = event => {
    event.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    }
    this.props.signUpUser(userData, this.props.history)
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render () {
    const { classes, UI: {loading} } = this.props
    const { errors } = this.state
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={Appicon} alt='icon' className={classes.image} />
          <Typography variant='h3' className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id='email'
              name='email'
              type='email'
              label='Email'
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
              helperText={errors.email}
              error={errors.email ? true : false}
            />
            <TextField
              id='password'
              name='password'
              type='password'
              label='Password'
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
              helperText={errors.password}
              error={errors.password ? true : false}
            />
            <TextField
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              label='Confirm Password'
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
              helperText={errors.confirmPassword}
              error={errors.password ? true : false}
            />
            <TextField
              id='handle'
              name='handle'
              type='text'
              label='Handle'
              className={classes.textField}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
              helperText={errors.handle}
              error={errors.handle ? true : false}
            />

            {errors.general && (
              <Typography variant='body2' className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.button}
              disabled={loading}
            >
              Signup
              {loading && (
                <CircularProgress size={20} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Already have an account? Login <Link to='/login'>here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    )
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signUpUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})
const mapActionToProps = {
  signUpUser
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(signup)) 
