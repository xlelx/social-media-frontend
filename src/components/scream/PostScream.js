import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MyButton from '../../util/MyButton'
import { postScream, clearErrors } from '../../redux/actions/dataActions'
import PropTypes from 'prop-types'

//MUI
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { CircularProgress } from '@material-ui/core'

//Icons
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

import { connect } from 'react-redux'

import theme from '../../util/theme'


const styles = {
  ...theme,

  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
  }
}

export class PostScream extends Component {
  state = {
    open: false,
    body: '',
    errors: {}
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      })
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '', open: false, errors: {} })
    }
  }
  handleOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.props.clearErrors()
    this.setState({ open: false, errors: {} })
  }
  handleSubmit = event => {
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
        <MyButton tip='New Post' onClick={this.handleOpen}>
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
          <DialogTitle>Post something new!</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name='body'
                label='New Post'
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
                type='submit'
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
  clearErrors: PropTypes.func.isRequired,

  UI: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  UI: state.UI
})

export default connect(mapStateToProps, { postScream, clearErrors })(
  withStyles(styles)(PostScream)
)
