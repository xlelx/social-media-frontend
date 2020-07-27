import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MyButton from '../util/MyButton'
import { postScream } from '../redux/actions/dataActions'
import PropTypes from 'prop-types'

//MUI
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

//Icons
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

import { connect } from 'react-redux'

import theme from '../util/theme'
import { CircularProgress } from '@material-ui/core'

const styles = {
  ...theme,

  submitButton: {
    position: 'relative'
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '6%'
  }
}

export class PostScream extends Component {
  state = {
    open: false,
    body: '',
    errors: {}
  }
  componentWillReceiveProps(nextProps){
      if(nextProps.UI.errors){
          this.setState({
              errors: nextProps.UI.errors
          })
      }
      if (!nextProps.UI.errors && !nextProps.UI.loading){
          this.setState({ body: "", open: false, errors:{}});
      }
  }
  handleOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.setState({ open: false, errors: {}})
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.postScream(this.state.body)
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  render () {
    const { errors } = this.state
    const {
      classes,
      UI: { loading }
    } = this.props
    return (
      <Fragment>
        <MyButton tip='Post a Scream' onClick={this.handleOpen}>
          <AddIcon></AddIcon>
        </MyButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth>
          <MyButton
            tip='Close'
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a Scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name='body'
                label='Scream'
                placeholder='Say what you want'
                type='text'
                fullWidth
                maxWidth='sm'
                rows='3'
                value={this.state.body}
                onChange={this.handleChange}
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
              ></TextField>
              <Button
                type="submit"
                variant='contained'
                onClick={this.handleSubmit}
                color='primary'
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  ></CircularProgress>
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  UI: state.UI
})

export default connect(mapStateToProps, { postScream })(
  withStyles(styles)(PostScream)
)
