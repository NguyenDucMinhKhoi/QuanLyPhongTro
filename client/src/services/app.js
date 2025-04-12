import axios from '../axiosConfig'

export const apiGetPrices = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/price/all'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetAcreages = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/acreage/all'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetProvinces = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/province/all'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetPublicProvinces = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/province/all'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})