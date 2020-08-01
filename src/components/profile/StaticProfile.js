import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MyButton from '../../util/MyButton'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import {Link } from 'react-router-dom'

import MuiLink from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

//Icons
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import LocationOn from '@material-ui/icons/LocationOn'

import themeObject from '../../util/theme'

const theme = themeObject

const styles = {
  ...theme
}

const StaticProfile = (props)=> {
    const { classes , profile: {handle, createdAt, imageUrl, bio, website, location}} = props;

    return (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className='image-wrapper'>
              <img src={imageUrl} alt='profile' className='profile-image' />
            </div>

            <hr />
            <div className='profile-details'>
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color='primary'
                variant='h5'
              >
                @{handle}
              </MuiLink>
              <hr />
              {bio && <Typography variant='body2'>{bio}</Typography>}
              <hr />
              {location && (
                <Fragment>
                  <LocationOn color='primary' /> <span>{location}</span>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <LinkIcon color='primary'></LinkIcon>
                  <a href={website} target='_blank' rel='roopener noreferrer'>
                    {'  '}
                    {website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalendarToday color='primary' />
              {`  `}
              <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
            </div>
          </div>
        </Paper>
    )
}

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(StaticProfile);