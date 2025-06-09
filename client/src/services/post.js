import axiosConfig from '../axiosConfig'

// Helper function để xử lý lỗi
const handleError = (error) => {
    console.error('Error in post service:', error);
    return {
        err: -1,
        msg: error.message || 'Something went wrong'
    };
}

// Helper function để tạo FormData
const createFormData = (payload) => {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, val]) => {
        if (val !== null && val !== undefined) {
            formData.append(key, val);
        }
    });
    return formData;
}

export const apiGetPosts = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/all',
        })
        resolve(response)
    } catch (error) {
        reject(handleError(error))
    }
})

export const apiGetPostsLimit = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/limit',
            params: query
        })
        resolve(response)
    } catch (error) {
        reject(handleError(error))
    }
})

export const apiGetNewPosts = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/new-post'
        })
        resolve(response)
    } catch (error) {
        reject(handleError(error))
    }
})

// Chỉ giữ lại một hàm tạo bài đăng, sử dụng tên rõ ràng hơn
export const apiCreatePost = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/post/create',
            data: payload instanceof FormData ? payload : createFormData(payload),
            headers: { "Content-Type": "multipart/form-data" }
        })
        resolve(response)
    } catch (error) {
        reject(handleError(error))
    }
})