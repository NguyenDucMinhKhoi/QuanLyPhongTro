import actionTypes from './actionTypes'
import * as apis from '../../services'

export const getCategories = () => async (dispatch) => {
    try {
        const response = await apis.apiGetCategories()
        if (response?.data.err === 0){
            dispatch({ 
                type: actionTypes.GET_CATEGORIES, 
                categories: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_CATEGORIES, 
                msg: response.data.msg,
                categories: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CATEGORIES,
            categories: null
        })
    }
}
export const getPrices = () => async (dispatch) => {
    try {
        const response = await apis.apiGetPrices()
        if (response?.data.err === 0){
            dispatch({ 
                type: actionTypes.GET_PRICES, 
                prices: response.data.response.sort((a, bg) => { return +a.order - +bg.order }),
                msg: ''
            })
        } else {
            dispatch({
                type: actionTypes.GET_PRICES, 
                msg: response.data.msg,
                prices: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRICES,
            prices: null,
            msg: error
        })
    }
}
export const getAcreages = () => async (dispatch) => {
    try {
        const response = await apis.apiGetAcreages()
        if (response?.data.err === 0){
            dispatch({ 
                type: actionTypes.GET_ACREAGES, 
                acreages: response.data.response.sort((a, b) => { return +a.order - +b.order }),
                msg: ''
            })
        } else {
            dispatch({
                type: actionTypes.GET_ACREAGES, 
                msg: response.data.msg,
                acreages: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ACREAGES,
            acreages: null,
            msg: error
        })
    }
}
export const getProvinces = () => async (dispatch) => {
    try {
        const response = await apis.apiGetProvinces()
        if (response?.data.err === 0){
            dispatch({ 
                type: actionTypes.GET_PROVINCES, 
                provinces: response.data.response,
                msg: ''
            })
        } else {
            dispatch({
                type: actionTypes.GET_PROVINCES, 
                msg: response.data.msg,
                provinces: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PROVINCES,
            provinces: null,
            msg: error
        })
    }
}
