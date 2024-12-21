import db from '../models'

// GET ALL ACREAGE
export const getAcreagesSevices = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Acreage.findAll({
            raw : true,
            attributes: ['code', 'value', 'order']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get acreages.',
            response
        })
    } catch (error) {
        reject(error)
    }
})