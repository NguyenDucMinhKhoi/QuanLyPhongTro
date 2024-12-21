import * as services from '../services/acreage'

export const getAcreages = async (req, res) => {
    try {
        const response = await services.getAcreagesSevices()
        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Error fetching acreages: ' + error
        })
    }
}