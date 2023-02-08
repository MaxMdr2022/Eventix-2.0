import axios from "axios";

//-------------------------------------------------
export const GET_ALL_EVENTS = "GET_ALL_EVENTS";

export const ERROR = "ERROR";

export const ORDER_BY_NAME = "ORDER_BY_NAME";

export const FILTER = "FILTER";

export const GET_EVENT_ID = "GET_EVENT_ID";

export const GET_NAME_EVENT = "GET_NAME_EVENT";

export const CREATE_EVENT = "CREATE_EVENT";

export const GET_ALL_EVENT_LIST = 'GET_ALL_EVENT_LIST';

export const PAY_CRYPTO = "PAY_CRYPTO";

export const PAYMENT_HANDLER = "PAYMENT_HANDLER";

export const CREATE_REVIEW = "CREATE_REVIEW";

export const GET_REVIEW = "GET_REVIEW";

export const GET_USERS = "GET_USERS";

export const CREATE_USER= "CREATE_USER";

export const GET_USER_EVENTS = "GET_USER_EVENTS";

export const GET_USER_REVIEWS = "GET_USER_REVIEWS";

export const USER_UPDATE = "USER_UPDATE";

export const GET_USER_ID ="GET_USER_ID";

export const EVENT_UPDATE = "EVENT_UPDATE";
//-------------------------------------------------
 const URL = "http://localhost:3001";
//-------------------------------------------------

export function getUsers() {
  return (dispatch) => {
    axios.get(`/users`)
      .then(response => {
        dispatch({
          type: GET_USERS,
          payload: response.data
        })
      })
      .catch(error => {
        console.log(error)
      });
  }
};

export function createUser(loginWithAuth0) {
  return (dispatch) => {
    axios.post(`users`, loginWithAuth0)
      .then(response => {
        dispatch({
          type: CREATE_USER,
          payload: response.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
};

export const getAllEvents = (page) => {

  return async function (dispatch) {

    try {

      const event = await axios.get(`events/page/${page}`);

      dispatch({

        type: GET_ALL_EVENTS,
        payload: event.data
      });

    } catch (error) {

      dispatch({

        type: ERROR,
        payload: error.message
      });
    };
  };
};

export const getAllEventList = () => {
  return async function (dispatch) {

    try {

      const event = await axios.get(`events/allevents`);

      dispatch({

        type: GET_ALL_EVENT_LIST,
        payload: event.data
      });

    } catch (error) {

      dispatch({

        type: ERROR,
        payload: error.message
      });
    };
  };
}

export const getNameEvent = (name) => {

  return async function (dispatch) {

    try {

      const event = await axios.get(`events/page/:page?name=${name}`);

      dispatch({

        type: GET_NAME_EVENT,
        payload: event.data
      });

    } catch (error) {

      dispatch({

        type: ERROR,
        payload: error.message
      });
    };
  };
};

export const orderByName = (order) => {

  return async function (dispatch) {

    try {

      const eventOrder = await axios.get(`order`, order);

      dispatch({

        type: ORDER_BY_NAME,
        payload: eventOrder.data
      })

    } catch (error) {

      dispatch({

        type: ERROR,
        payload: error.message
      })
    };
  };
};

export const filter = (info) => {   
  return async function (dispatch) {

    // console.log("infoo",info);
    try {
      const eventDate = await axios.post(`filters`, info);
      dispatch({

        type: FILTER,
        payload: eventDate.data
        
      })

    } catch (error) {

      dispatch({

        type: ERROR,
        payload: error.message
      })
    };
  };
};

export const searchEventById = (id) => {
  return async function (dispatch){
    try {
    
      const eventDetailed = await axios.get(`events/${id}`)
      // console.log(eventDetailed.data)
      dispatch({
        type: GET_EVENT_ID,
        payload: eventDetailed.data
      })

    } catch (error) {
      dispatch({

        type: ERROR,
        payload: error.message
      })
    }
  }
}

export const getAllUsers = () => {
  return async function (dispatch){
    try {
    
      const user = await axios.get(`users`)
       console.log(user.data)
      dispatch({
        type: GET_USERS,
        payload: user.data
      })

    } catch (error) {
      dispatch({

        type: ERROR,
        payload: error.message
      })
    }
  }
}

export const getUserEvents = (id) => {
  return async function (dispatch){
    try {
    
      const events = await axios.get(`users/${id}/events`)

      dispatch({
        type: GET_USER_EVENTS,
        payload: events.data
      })

    } catch (error) {
      dispatch({

        type: ERROR,
        payload: error.message
      })
    }
  }
}

export const getUserReviews = (id) => {
  return async function (dispatch){
    try {
    
      const reviews = await axios.get(`review/${id}/reviews`)

      dispatch({
        type: GET_USER_REVIEWS,
        payload: reviews.data
      })

    } catch (error) {
      dispatch({

        type: ERROR,
        payload: error.message
      })
    }
  }
}

export const createEvent = (data) => {

  return async function(dispatch){

    try {
      
      const event = await axios.post(`events`, data);

      dispatch({

        type: CREATE_EVENT,
        payload: event.data
      })

    } catch (error) {

      dispatch({

        type: ERROR,
        payload: error.message
      })
    }
  };
};

export const createReview = (data) => {

  return async function(dispatch){

    try {
      
      const event = await axios.post(`review`, data);

      dispatch({

        type: CREATE_REVIEW,
        payload: event.data
      })

    } catch (error) {

      dispatch({

        type: ERROR,
        payload: error.message
      })
    }
  };
};

export const payCrypto = (data) =>{

  return async function (dispatch){

    try {
      //  console.log("action", data);
      
      const url = await axios.post(`paycrypto/create-charge`,data );

      dispatch({
        type: PAY_CRYPTO,
        payload: url.data
      })

    } catch (error) {
     
      dispatch({
        type: ERROR,
        payload: error.message
      })
    }
  };
};

export const paymentHandler = (userId) => {

  return async function (dispatch){

    try {
      // console.log(userId);
      
      const info = await axios.get("ticket/" + userId);

      // console.log("action info:", info.data);
      dispatch({
        type: PAYMENT_HANDLER,
        payload: info.data
      })

    } catch (error) {
      
      dispatch({
        type:ERROR,
        payload: error.message
      })
    }
  }
};


export const notificationPayment = (infoPago) => {

  return async function (dispatch){

    try {
      // console.log("info action:", infoPago);
      
      // const info = 
      await axios.get(`ticket/notification/`+ infoPago);

      // console.log("action info.data:", info.data);
      

    } catch (error) {
      
      dispatch({
        type:ERROR,
        payload: error.message
      })
    }
  }
};


export const userUpdate = (id, info) => {
  return async function (dispatch){
    try {
    
      const user = await axios.put(`users/${id}` , info)

      // console.log("userUpdate action: ", user.data);

      dispatch({
        type: USER_UPDATE,
        payload: user.data
      })

    } catch (error) {
      dispatch({

        type: ERROR,
        payload: error.message
      })
    }
  }
};

export function getUsersid(id) {
  return (dispatch) => {
    axios.get(`/users/` + id)
      .then(response => {
        dispatch({
          type: GET_USER_ID,
          payload: response.data
        })
      })
      .catch(error => {
        console.log(error)
      });
  }
};

export const eventUpdate = (id, info) => {
  return async function (dispatch){
    try {
    
      const event = await axios.put(`events/${id}` , info)

      // console.log("eventUpdate action: ", user.data);

      dispatch({
        type: EVENT_UPDATE,
        payload: event.data
      })

    } catch (error) {
      dispatch({

        type: ERROR,
        payload: error.message
      })
    }
  }
};