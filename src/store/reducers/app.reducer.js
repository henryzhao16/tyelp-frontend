import * as actions from '../actions/app.actions';

const initialState = {
    user: {
        username: null,
        userID: null,
        favorites: []
    },
    authenticated: false,
    token: null,
    distance: 5000,
    coordinates: {
        latitude: 45.505724099999995,
        longitude: -73.6995759
    }
}

const appReducer = (state = initialState, action) => {
    
    switch (action.type) 
    {
        case actions.SET_TOKEN_SUCCESS:
            return {
                ...state,
                token: action.payload.token
            }
        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                authenticated: true
            }
        case actions.LOGOUT_SUCCESS: 
            return {
                ...state,
                user: {
                    username: null,
                    userID: null,
                    favorites: []
                },
                authenticated: false,
                token: null,
                distance: 5000,
                coordinates: {
                    latitude: 45.505724099999995,
                    longitude: -73.6995759
                }
            }
        
        case actions.REGISTER_SUCCESS:
            return {
              ...state,
              user: action.payload.user,
              authenticated: true
            }

        case actions.SET_DISTANCE_SUCCESS:
            return {
                ...state,
                distance: action.payload.distance
            }
        case actions.SET_COORDINATES_SUCCESS:
            return {
                ...state,
                coordinates: {
                    latitude: action.payload.latitude,
                    longitude: action.payload.longitude
                }
            }
        case actions.SET_FAVORITES_SUCCESS:


            const current_favorites = state.user.favorites/*.map( x => {
                return {
                  name: x.name,
                  rating: x.rating,
                  price_level: x.price_level,
                  vicinity: x.vicinity
                }
            })*/;
            console.log(current_favorites);

            var new_favorites;

            if (current_favorites.length < 5) {
                new_favorites = [...current_favorites, action.payload.favorite]
            }
            else {
                new_favorites = [...current_favorites.slice(1), action.payload.favorite];
            }

            return {
                ...state,
                user: {
                    ...state.user,
                    favorites: new_favorites
                }
            }
        default:
            return state;       
    }
};

export default appReducer;
