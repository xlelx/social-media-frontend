import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import theme from '../../util/theme'

//MUI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = {
  ...theme,
  commentImage: {
    maxWidth: '100%',
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%'
  },
  commentData: {
    marginLeft: '20px'
  }
}
class Comments extends Component {
  render () {
    const { comments, classes } = this.props
    return (
      <Grid container>
        {comments
          ? comments.map((comment, index) => {
              const { body, createdAt, userImage, userHandle } = comment
              return (
                <Fragment key={createdAt}>
                  <Grid item sm={12}>
                    <Grid container>
                      <Grid item sm={2}>
                        <img
                          src={userImage}
                          alt='comment'
                          className={classes.commentImage}
                        ></img>
                      </Grid>
                      <Grid item sm={9}>
                        <div className={classes.commentData}>
                          <Typography
                            variant='h5'
                            component={Link}
                            to={`/users/${userHandle}`}
                            color='primary'
                          >
                            {userHandle}
                          </Typography>
                          <Typography varaint='body2' color='textSecondary'>
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                          </Typography>
                          <hr className={classes.hrRuler} />
                          <Typography variant='body1'>{body}</Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  {index !== comments.length - 1 && (
                    <hr className={classes.hRulerVisible} />
                  )}
                </Fragment>
              )
            })
          : null}
      </Grid>
    )
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
}

export default withStyles(styles)(Comments)
