const getEvents = require("./getEvents");
const {Event} = require('../db')
const {filterByDate, filterByAge, filterByLocation, filterByPrice, filterByTypeEvent} = require("./filters");
const sorts = require("./sort");

const storeFiltered = async(body)=>{

    let state = [];

    let filter = true;

    if(!body.fDate && !body.fName && !body.fAge && !body.fPrice && !body.fLocation && !body.fSort && !body.fTypeEvent){

        // const events = await getEvents();
        // return events;
        filter = false;
    };
    
    if(body.fDate == true){

        const {day, month, year} = body;

        state = state.length > 0 ? state : await Event.findAll();

        state = await filterByDate(day, month, year, state); 
        // console.log(state)
        if(typeof state === "string") return state
    };

    if(body.fName === true){

        const {name} = body;

        if(!name){

            return "name not entered"
        }
        // console.log(name);
        state = state.length > 0 ? state : await Event.findAll();

        
        state = await state.filter((event) => event.name.toLowerCase().includes(name.toLowerCase()))

        // console.log(store);
        if(!state.length > 0) return "No event with that name found"
    };

    // console.log(body);

    if(body.fPrice == true){

        const {price} = body;

        state = state.length > 0 ? state : await Event.findAll();

        state = await filterByPrice(price, state);

        if(!state.length > 0) return "there are no events with that price"

        if(typeof state === "string") return state
    };

    if(body.fAge === true){

        const {age} = body;

        state = state.length > 0 ? state : await Event.findAll();

        state = await filterByAge(age, state);

        if(!state.length > 0) return "no events found"

        if(typeof state === "string") return state
    };

    if(body.fLocation === true){

        const {location} = body;

        state = state.length > 0 ? state : await Event.findAll();

        state = await filterByLocation(location, state);

        if(!state.length > 0) return "no events found at that location"

        if(typeof state === "string") return state
    }

    if(body.fTypeEvent === true){

        const {typeEvent} = body;

        state = state.length > 0 ? state : await Event.findAll();

        // console.log("estado filtro TE", state)

        state = await filterByTypeEvent(typeEvent, state);

        if(!state.length > 0) return "no events found typeEvent"

        if(typeof state === "string") return state
    };

    if(body.fSort === true){

        const {sort} = body;

        state = state.length > 0 ? state : await Event.findAll();

        state = await sorts(sort, state);
    }

    if(!state.length > 0 && filter){

        return "error1812"
    }

    return state;
};

module.exports = storeFiltered;