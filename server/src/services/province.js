import db from '../models'

// GET ALL PROVINCE
export const getProvincesSevices = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Province.findAll({
            raw : true,
            attributes: ['code', 'value']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get province.',
            response
        })
    } catch (error) {
        reject(error)
    }
})
