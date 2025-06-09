import * as postService from '../services/post';

export const getPosts = async (req, res) => {
    try {
        const response = await postService.getPostsService();
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}
export const getPostsLimit = async (req, res) => {
    const { page, priceNumber, acreageNumber, ...query } = req.query
    try {
        const response = await postService.getPostsLimitService(page, query, { priceNumber, acreageNumber });
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}
export const getNewPosts = async (req, res) => {
    try {
        const response = await postService.getNewPostService();
        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}

export const createPost = async (req, res) => {
    try {
        const { title, star, address, categoryCode, priceCode, acreageCode, description, priceNumber, acreageNumber, target } = req.body;
        const images = req.files; // Lấy danh sách ảnh từ multer middleware
        const userId = req.user.id; // Lấy userId từ middleware xác thực

        // Validate dữ liệu
        if (!title || !address || !categoryCode || !priceNumber || !acreageNumber || !description) {
            return res.status(400).json({
                err: 1,
                msg: 'Missing required fields'
            });
        }

        if (!images || images.length === 0) {
            return res.status(400).json({
                err: 1,
                msg: 'Please upload at least one image'
            });
        }

        const response = await postService.createPostService({
            title,
            star,
            address,
            categoryCode,
            priceCode,
            acreageCode,
            description,
            priceNumber,
            acreageNumber,
            target,
            images,
            userId
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        });
    }
}