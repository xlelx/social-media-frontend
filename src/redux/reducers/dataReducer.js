import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  SET_SCREAM,
  POST_SCREAM,
  SUBMIT_COMMENT
} from '../types'

const initialState = {
  screams: [],
  scream: {},
  loading: false
}

export default function (state = initialState, action) {
  let index
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      }
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload
      }
    case SET_SCREAMS:
      return {
        ...state,
        loading: false,
        screams: action.payload
      }
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      index = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      )
      state.screams[index] = {...state.screams[index], ...action.payload}
      if (state.scream.screamId === action.payload.screamId){
        state.scream = {...state.scream, ...action.payload}
      }
      return {
        ...state
      }
    case DELETE_SCREAM:
      index = state.screams.findIndex(
        scream => scream.screamId === action.payload
      )
      state.screams.splice(index, 1)

      return { ...state }
    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments]
        }

      }
    case POST_SCREAM:
        return {
            ...state,
            screams: [
                action.payload,
                ...state.screams
            ]
        };
    default:
      return state
  }
}
