import db from '../models'
const { Op } = require("sequelize")

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

export const getPostsLimitService = (page, query, { priceNumber, acreageNumber }) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : (+page - 1)
        const queries = { ...query }
        if (priceNumber) queries.priceNumber = { [Op.between]: priceNumber }
        if (acreageNumber) queries.acreageNumber = { [Op.between]: acreageNumber }
        const response = await db.Post.findAndCountAll({
            where: queries,
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

export const createPostService = (data) => new Promise(async (resolve, reject) => {
    try {
        const { title, star, address, categoryCode, priceCode, acreageCode, description, priceNumber, acreageNumber, target, images, userId } = data;

        // Tạo bản ghi trong bảng Attributes
        const attributes = await db.Attribute.create({
            price: priceNumber,
            acreage: acreageNumber,
            published: new Date(),
            hashtag: target
        });

        // Tạo bản ghi trong bảng Overview
        const overview = await db.Overview.create({
            code: categoryCode,
            area: acreageNumber,
            type: target
        });

        // Tạo bản ghi trong bảng Post
        const post = await db.Post.create({
            id: Math.random().toString(36).substring(2, 8), // Tạo id ngẫu nhiên
            title,
            star,
            address,
            categoryCode,
            priceCode,
            acreageCode,
            description,
            priceNumber,
            acreageNumber,
            userId,
            attributesId: attributes.id,
            overviewId: overview.id
        });

        // Lưu ảnh
        const imagePromises = images.map(async (image) => {
            return await db.Image.create({
                image: image.path, // Đường dẫn ảnh sau khi upload
                postId: post.id
            });
        });

        await Promise.all(imagePromises);

        resolve({
            err: 0,
            msg: 'Created post successfully',
            response: {
                id: post.id,
                title: post.title,
                address: post.address,
                priceNumber: post.priceNumber,
                acreageNumber: post.acreageNumber
            }
        });

    } catch (error) {
        reject(error);
    }
});