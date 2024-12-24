import db from '../models'

export const getPostsService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'title', 'star', 'address', 'description'],
            include: [
                {
                    model: db.Image,
                    as: 'images',
                    attributes: ['image']
                },
                {
                    model: db.Attribute,
                    as: 'attributes',
                    attributes: ['price', 'acreage', 'published', 'hashtag']
                },
                {
                    model: db.User,
                    as: 'user',
                    attributes: ['name', 'zalo', 'phone']
                }
            ]
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts is failed.',
            response
        })

    } catch (error) {
        reject()
    }
})

export const getPostsLimitService = (page, query) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : (+page - 1)
        const response = await db.Post.findAndCountAll({
            where: query,
            raw: true,
            nest: true,
            offset: offset * +process.env.LIMIT,
            limit: +process.env.LIMIT,
            attributes: ['id', 'title', 'star', 'address', 'description'],
            include: [
                {
                    model: db.Image,
                    as: 'images',
                    attributes: ['image']
                },
                {
                    model: db.Attribute,
                    as: 'attributes',
                    attributes: ['price', 'acreage', 'published', 'hashtag']
                },
                {
                    model: db.User,
                    as: 'user',
                    attributes: ['name', 'zalo', 'phone']
                }
            ]
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts is failed.',
            response
        })

    } catch (error) {
        reject()
    }
})

export const getNewPostService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest: true,
            offset: 0,
            order: [['createdAt', 'DESC']],
            limit: +process.env.LIMIT,
            attributes: ['id', 'title', 'star', 'createdAt'],
            include: [
                {
                    model: db.Image,
                    as: 'images',
                    attributes: ['image']
                },
                {
                    model: db.Attribute,
                    as: 'attributes',
                    attributes: ['price', 'acreage', 'published', 'hashtag']
                }
            ]
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts is failed.',
            response
        })

    } catch (error) {
        reject()
    }
})