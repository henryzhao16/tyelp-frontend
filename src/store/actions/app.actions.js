import axiosInstance from "../../interceptors/axios";
import Store from "../store";
/**
 * Application Actions
 */

export const SET_TOKEN = 'SET_TOKEN';
export const SET_TOKEN_SUCCESS = 'SET_TOKEN_SUCCESS';
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const SET_DISTANCE = 'SET_DISTANCE';
export const SET_DISTANCE_SUCCESS = 'SET_DISTANCE_SUCCESS';
export const SET_COORDINATES = 'SET_COORDINATES';
export const SET_COORDINATES_SUCCESS = 'SET_COORDINATES_SUCCESS';
export const SET_FAVORITES = 'SET_FAVORITE';
export const SET_FAVORITES_SUCCESS = 'SET_FAVORITE_SUCCESS';
export const SET_HISTORY = 'SET_HISTORY';
export const GET_HISTORY = 'GET_HISTORY';
export const GET_HISTORY_SUCCESS = 'GET_HISTORY_SUCCESS';
 
/**
 * Application Action Creators
 */

export const SET_TOKEN_ACTION = () => {
    
    let token = null;
    // asynchronous call using axios instance
    
    return (dispatch /* getState */) => { // second argument to access redux state if needed
        dispatch(SET_TOKEN_ACTION_SUCCESS(token));
    };
};

export const SET_TOKEN_ACTION_SUCCESS = (token) => {
    return {
        type: SET_TOKEN_SUCCESS,
        payload: {
            token: token
        }
    }
};

export const LOGIN_ACTION = (username, password) => {
    let user = null;

    return (dispatch) => {
        axiosInstance.logIn({
            username,
            password,
        }).then((response) => {
            var data = JSON.parse(response.data);
            var userID = data['user_id'];

            delete data['user_id'];
            user = {
                username: username,
                userID: userID,
                favorites: data
            };
            dispatch(LOGIN_ACTION_SUCCESS(user));
            console.log("Authenticated");
        }).catch(function (error) {
          console.log('Error on Authentication');
          console.log(error);
        });
    };
}

export const LOGIN_ACTION_SUCCESS = (user) => {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            user: user
        }
    }
}

export const LOGOUT_ACTION = () => {
    return (dispatch) => {
       dispatch(LOGOUT_ACTION_SUCCESS());
    }
}

export const LOGOUT_ACTION_SUCCESS = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const REGISTER_ACTION = (username, firstName, lastName, password) => {
    let user = null;

    return (dispatch) => {
      axiosInstance.register({
        username,
        firstName,
        lastName,
        password,
      }).then((response) => {
        user = {
          username: username,
          userID: JSON.parse(response.data)['user_id'],
          favorites: []
        };
        console.log(JSON.parse(response.data)['user_id']);
        dispatch(REGISTER_ACTION_SUCCESS(user));
      }).catch(function (error) {
        console.log(error);
      });
    };
}

export const REGISTER_ACTION_SUCCESS = (user) => {
  return {
    type: REGISTER_SUCCESS,
    payload: {
      user: user
    }
  }
}

export const SET_DISTANCE_ACTION = (distance) => {
    return (dispatch) => {
        dispatch(SET_DISTANCE_ACTION_SUCCESS(distance))
    };
}

export const SET_DISTANCE_ACTION_SUCCESS = (distance) => {
    return {
        type: SET_DISTANCE_SUCCESS,
        payload: {
            distance: distance
        }
    };
}

export const SET_COORDINATES_ACTION = (latitude, longitude) => {
    return (dispatch) => {
        dispatch(SET_COORDINATES_ACTION_SUCCESS(latitude, longitude))
    };
}

export const SET_COORDINATES_ACTION_SUCCESS = (latitude, longitude) => {
    return {
        type: SET_COORDINATES_SUCCESS,
        payload: {
            latitude: latitude, 
            longitude: longitude
        }
    };
}

export const SET_FAVORITES_ACTION = (favorite) => {
    return (dispatch) => {
        dispatch(SET_FAVORITES_ACTION_SUCCESS(favorite))
    };
}

export const SET_FAVORITES_ACTION_SUCCESS = (favorite) => {
    return {
        type: SET_FAVORITES_SUCCESS,
        payload: {
            favorite: favorite
        }
    };
}

export const SET_HISTORY_ACTION = (userID, name, rating, price_level, vicinity) => {
  return () => {
    axiosInstance.addPlaceToHistory({
      userID,
      name,
      rating,
      price_level,
      vicinity
    }).catch(function (error) {
      console.log(error);
    });
  };
}


