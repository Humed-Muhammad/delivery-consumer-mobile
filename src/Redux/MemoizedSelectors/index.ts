import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@Redux/store";

/** 
 @Pickup selectors
**/

// Pickup location markers and all places
export const pickupPlaces = (state: RootState) => {
    const pickupplace = (state: RootState) => state.pickup.pickupPlace
    const pickupMarkerLocations = createSelector(pickupplace, location => location);

    return pickupMarkerLocations(state)
}
export const sender = (state) => {
    const senderInputSelector = (state) => state.pickup.sender;
    const senderOutputSelector = createSelector([senderInputSelector], senders => senders)
    return senderOutputSelector(state)
}

export const pickupIsCheckedStatus = (state) => {
    const isCheckedInputSelector = (state) => state.pickup.status.pickupIsChecked;
    const isCheckedOutputSelector = createSelector([isCheckedInputSelector], isChecked => isChecked)

    return isCheckedOutputSelector(state)
}

export const vehicleId = (state) => {
    const vehicleIdInputSelector = (state) => state.pickup.vehicleId;
    const vehicleIdOutputSelector = createSelector([vehicleIdInputSelector], vehicleId => vehicleId)
    return vehicleIdOutputSelector(state)
}
export const pickupLineCoordinates = (state) => {
    const inputSelector = (state) => state.pickup.pickupLineCoordinates;
    const outputSelector = createSelector([inputSelector], coordinates => coordinates)

    return outputSelector(state)
}




/** 
 @Dropoff selectors
**/
// dropofff location markers and all places
export const dropoffPlaces = (state) => {
    const dropoffPlace = (state) => state.dropoff.dropoffPlace
    const dropoffMarkerLocations = createSelector(dropoffPlace, location => location)

    return dropoffMarkerLocations(state)
}

// receiver selector
export const receiver = (state) => {
    const receiverInputSelector = (state) => state.pickup.receiver;
    const receiverOutputSelector = createSelector([receiverInputSelector], receivers => receivers)
    return receiverOutputSelector(state)
}

export const dropoffLineCoordinates = (state) => {
    const inputSelector = (state) => state.dropoff.dropoffLineCoordinates;
    const outputSelector = createSelector([inputSelector], coordinates => coordinates)

    return outputSelector(state)
}

export const selectTotalDistance = (state) => {
    const inputSelector = (state) => state.dropoff.totalDistance;
    const outputSelector = createSelector([inputSelector], (distance: Array<number>) => distance.reduce((current, total) => current + total))

    return outputSelector(state)
}






/** 
 * @Input status checker
 *  dropoff checkbox input status chekcer
 *  **/
export const dropoffIsCheckedStatus = (state) => {
    const isCheckedInputSelector = (state) => state.dropoff.status.dropoffIsChecked;
    const isCheckedOutputSelector = createSelector([isCheckedInputSelector], isChecked => isChecked)

    return isCheckedOutputSelector(state)
}


/**
 * @Vehicle selector
 * **/

export const vehicleList = (state) => {
    const vehicleListInputSelector = (state) => state.vehicleList.vehicleList;
    const vehicleListOutputSelector = createSelector([vehicleListInputSelector], vehicles => vehicles)

    return vehicleListOutputSelector(state)
}



/**
 * @Profile selector
 * **/

export const userProfileData = (state) => {
    const inputSelector = (state) => state.account.userProfileData;
    const outputSelector = createSelector([inputSelector], data => data)

    return outputSelector(state)
}


/**
 * @Vehicles selector
 * **/

export const vehiclesSelector = (state) => {
    const inputSelector = (state) => state.vehicleList.vehicleList;
    const outputSelector = createSelector(inputSelector, (vehciles: Array<object>) => vehciles.filter((item: any) => item.status === true))

    return outputSelector(state)
}

/**
 * @Reports selector
 * **/

export const reportData = (state) => {
    const inputSelector = (state) => state.report.reports;
    const outputSelector = createSelector([inputSelector], reports => reports)

    return outputSelector(state)
}

/**
 * @User language selector 
 * **/
export const languageData = (state: RootState) => {
    const inputSelector = (state: RootState) => state.user.language
    const outputSelector = createSelector([inputSelector], language => language)

    return outputSelector(state)
}

export const networkStatus = (state: RootState) => {
    const inputSelector = (state: RootState) => state.user.networkStatus
    const outputSelector = createSelector([inputSelector], status => status)

    return outputSelector(state)
}


/**
 * @Orders memo
 **/
export const ordersData = (state: RootState) => {
    const inputSelector = (state: RootState) => state.order.orders
    const outputSelector = createSelector([inputSelector], orders => orders)

    return outputSelector(state)
}
