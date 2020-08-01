import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import PostScream from '../scream/PostScream'
import Notifications from './Notifications'

//REdux
import { connect } from 'react-redux'

//MUI
import AppBar from '@material-ui/core/Appbar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

//Icon
import HomeIcon from '@material-ui/icons/Home'


class NavBar extends Component {
  render () {
    const { authenticated } = this.props
    return (
      <AppBar>
        <Toolbar className='nav-container'>
          {authenticated ? (
            <Fragment>
              <PostScream></PostScream>
              <Link to='/'>
                <MyButton tip='Home'>
                  <HomeIcon ></HomeIcon>
                </MyButton>
              </Link>
                  <Notifications></Notifications>
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
