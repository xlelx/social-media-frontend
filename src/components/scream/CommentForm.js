import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

//mui
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

//redux
import { connect} from 'react-redux'
import { submitComment } from '../../redux/actions/dataActions'

import theme from '../../util/theme'

const styles = {
    ...theme
}

class CommentForm extends Component {
    state = {
        body: '',
        errors : {}
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors})
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({body: ''})
        }
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        this.props.submitComment(this.props.screamId, this.state.body)
    }
    handleChange=(event)=>{
        this.setState({[event.target.name] : event.target.value})
    }
    render() {
        const { classes, authenticated } = this.props;  
        const errors = this.state.errors
        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{ textAlign: 'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                    name="body"
                    type="text"
                    label="Comment Here"
                    error={errors.comment ? true : false}
                    helperText={errors.comment}
                    value={this.state.body}
                    onChange={this.handleChange}
                    fullWidth
                    className={classes.textField}></TextField>
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        Submit
                    </Button>
                </form>
                <hr className={classes.hRulerVisible}/>
            </Grid> 

        ) : null
        return commentFormMarkup
    }
}

CommentForm.propTypes = {
    submitComment : PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
}
const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, {submitComment})(withStyles(styles)(CommentForm))

