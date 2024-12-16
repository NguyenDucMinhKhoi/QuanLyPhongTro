export const path = {
    HOME: '/*',
    LOGIN: 'login',
    CHO_THUE_CAN_HO: 'cho-thue-can-ho',
    CHO_THUE_MAT_BANG: 'cho-thue-mat-bang',
    NHA_CHO_THUE: 'nha-cho-thue',
    CHO_THUE_PHONG_TRO: 'cho-thue-phong-tro'
}

export const text = {
    HOME_TITLE: 'DogMyx nơi tìm thấy niềm vui số một Việt Nam',
    HOME_DESCRIPTION: 'Chào mừng bạn đến với trang web của ông chủ DogMyx, nơi bạn có thể tìm và sở hữu body quyết rũ của DogMyx'
}

export const formatVietnameseToString = (keyword) => {
    return keyword
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .join("-")
}