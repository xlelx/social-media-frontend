import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

import Scream from '../components/scream/Scream'
import ScreamSkeleton from '../util/ScreamSkeleton'

import Profile from '../components/profile/Profile'
import { connect } from 'react-redux'

import { getScreams } from '../redux/actions/dataActions'

class Home extends Component {
  componentDidMount () {
    this.props.getScreams();
  }
  render () {
    const { screams, loading } = this.props.data
    let recentScreamsMarkup = !loading ? (
      screams.map(scream => (
        <Scream scream={scream} key={scream.screamId} />
      ))
    ) : (
      <ScreamSkeleton></ScreamSkeleton>
    )
    return (
      <Grid container spacing={1}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    )
  }
}

Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, { getScreams })(Home)
