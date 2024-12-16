import * as services from '../services/category'

export const getCategories = async (req, res) => {
    try {
        const response = await services.getCategoriesSevices()
        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Error fetching categories: ' + error
        })
    }
}