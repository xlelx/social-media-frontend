import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton'

//REdux
import { connect } from 'react-redux'

//MUI
import AppBar from '@material-ui/core/Appbar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

//Icon
import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'
import Notifications from '@material-ui/icons/Notifications'

class NavBar extends Component {
  render () {
    const { authenticated } = this.props
    return (
      <AppBar>
        <Toolbar className='nav-container'>
          {authenticated ? (
            <Fragment>
              <MyButton tip='Post a Scream'>
                <AddIcon ></AddIcon>
              </MyButton>
              <Link to='/'>
                <MyButton tip='Home'>
                  <HomeIcon ></HomeIcon>
                </MyButton>
              </Link>
              <MyButton tip="Notifications">
                  <Notifications></Notifications>
              </MyButton>
            </Fragment>
          ) : (
            <Fragment>
              <Button color='inherit' component={Link} to='/login'>
                Login
              </Button>
              <Button color='inherit' component={Link} to='/signup'>
                Signup
              </Button>
              <Button color='inherit' component={Link} to='/'>
                Home
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}
NavBar.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
})
export default connect(mapStateToProps)(NavBar)
