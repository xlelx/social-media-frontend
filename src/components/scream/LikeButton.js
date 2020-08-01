import React, { Component } from 'react'
import MyButton from '../../util/MyButton'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

//ICons
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
//redux
import { connect } from 'react-redux'

import { likeScream, unlikeScream } from '../../redux/actions/dataActions'

class LikeButton extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.screamId === this.props.screamId)
    )
      return true
    else return false
  }

  likeScream = () => {
    this.props.likeScream(this.props.screamId)
  }
  unlikeScream = () => {
    this.props.unlikeScream(this.props.screamId)
  }
  render () {
    const { authenticated } = this.props.user
    const likeButton = !authenticated ? (
      <Link to='/login'>
        <MyButton tip='You need to be signed in to like.'>
          <FavoriteBorder color='primary'></FavoriteBorder>
        </MyButton>
      </Link>
    ) : this.likedScream() ? (
      <MyButton tip='Unlike' onClick={this.unlikeScream}>
        <FavoriteIcon color='primary'></FavoriteIcon>
      </MyButton>
    ) : (
      <MyButton tip='Like' onClick={this.likeScream}>
        <FavoriteBorder color='primary'></FavoriteBorder>
      </MyButton>
    )
    return likeButton
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

const mapActionToProps = {
  likeScream,
  unlikeScream
}
export default connect(mapStateToProps, mapActionToProps)(LikeButton)
