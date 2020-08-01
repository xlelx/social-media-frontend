import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'

import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import LikeButton from './LikeButton'
import Comments from './Comments';
import MyButton from '../../util/MyButton'
import CommentForm from './CommentForm'
//MUI
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { CircularProgress } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
//Icons
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import CloseIcon from '@material-ui/icons/Close'
import ChatIcon from '@material-ui/icons/Chat'
//Redux
import { connect } from 'react-redux'
import { getScream, clearErrors } from '../../redux/actions/dataActions'

import theme from '../../util/theme'

const styles = {
  ...theme,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '91%'
  },
  expandButton: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  }
}

class ScreamDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: ""
  }
  componentDidMount(){
    if (this.props.openDialog){
      console.log("opening dialog")
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, screamId} = this.props;
    const newPath = `/users/${userHandle}/scream/${screamId}`

    window.history.pushState(null,null, newPath);
    if (oldPath === newPath) oldPath = `/users/${userHandle}`
    this.setState({ open: true, oldPath, newPath })
    this.props.getScream(this.props.screamId)
  }
  handleClose = () => {
    window.history.pushState(null,null, this.state.oldPath);

    this.setState({ open: false})
    this.props.clearErrors()
  }
  render () {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments
      },
      UI: { loading }
    } = this.props

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2}></CircularProgress>
      </div>
    ) : (
      <Grid container spacing={12}>
        <Grid item sm={5}>
          <img src={userImage} alt='profile' className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color='primary'
            variant='h5'
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.hRuler}></hr>
          <Typography variant='body2' color='textSecondary'>
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.hRuler}></hr>
          <Typography variant='body1'>{body}</Typography>
          <LikeButton screamId={screamId}></LikeButton>
          <span>{likeCount} likes</span>
          <MyButton tip='Comments'>
            <ChatIcon color='primary' />
          </MyButton>
          <span>{commentCount} Comments</span>
        </Grid>
        <hr className={classes.hRulerVisible}></hr>
        <CommentForm screamId={screamId}></CommentForm>

        <Comments comments={comments}></Comments>
      </Grid>
    )
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip='Expand this post'
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color='primary'></UnfoldMore>
        </MyButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth>
          <MyButton
            tip='Close'
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,

  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  scream: state.data.scream,
  UI: state.UI
})

const mapActionsToProps = {
  getScream, clearErrors
}
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog))
