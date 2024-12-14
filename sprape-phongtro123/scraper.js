const scrapeCategory = async (browser, url) => {
    return new Promise(async (resolve, reject) => {
        try {
            let page = await browser.newPage();
            console.log('>> Mở tab mới ...');
            await page.goto(url);
            console.log('>> Truy cập vào ' + url);
            await page.waitForSelector('#webpage');
            console.log('>> Website đã load xong ...');

            const dataCategory = await page.$$eval('.pt123__nav > ul > li', (els) => {
                return els.map((el) => ({
                    category: el.querySelector('a').innerText,
                    link: el.querySelector('a').href
                }));
            });

            console.log('>> Dữ liệu category:', dataCategory);
            await page.close();
            console.log('>> Tab đã đóng.');
            resolve(dataCategory);
        } catch (err) {
            console.log('Lỗi ở scrape category:', err.message);
            reject(err);
        }
    });
};

const scraperDetail = async (browser, link) => {
    let pageDetail = null;
    try {
        if (!link) {
            console.log('Link không hợp lệ, bỏ qua...');
            return;
        }

        pageDetail = await browser.newPage();
        console.log('>> Mở tab chi tiết...');
        await pageDetail.goto(link, { waitUntil: 'domcontentloaded', timeout: 60000 });
        console.log('>> Truy cập ' + link);

        // Kiểm tra thẻ <main>
        const mainSelector = 'main';
        const mainElement = await pageDetail.$(mainSelector);
        if (!mainElement) {
            throw new Error(`Không tìm thấy selector: ${mainSelector}`);
        }
        console.log('>> Đã tìm thấy tag <main> trên trang chi tiết.');

        // Tạo object detailData để lưu trữ dữ liệu
        const detailData = {};

        // Lấy thông tin từ header
        detailData.headerDetails = await pageDetail.$eval('header.border-bottom.pb-4.mb-4', (el) => {
            return {
                // Tiêu đề
                title: el.querySelector('h1')?.innerText.trim() || 'Không có tiêu đề',

                // Đánh giá sao
                star: el.querySelector('.star')?.className.replace(/^\D+/g, '') || 'Không có đánh giá',

                // Mô tả (Tin VIP nổi bật)
                description: el.querySelector('.badge')?.innerText.trim() || 'Không có mô tả',

                // Địa chỉ
                address: el.querySelector('address')?.innerText.trim() || 'Không có địa chỉ',

                // Thuộc tính
                attributes: {
                    price: el.querySelector('.text-price.fs-5.fw-bold')?.innerText.trim() || 'Không có giá',
                    acreage: el.querySelector('.dot.mx-3 span')?.innerText.trim() || 'Không có diện tích',
                    published: el.querySelector('time')?.innerText.trim() || 'Không có thời gian đăng',
                    postId: el.querySelector('div > span')?.innerText.trim().replace('Mã tin: ', '') || 'Không có mã tin'
                }
            };
        });

        console.log('>> Header details:', detailData.headerDetails);

        // Lấy danh sách ảnh và lưu vào detailData
        detailData.images = await pageDetail.$$eval(
            'div.container > div.row > div.col-md-9 > div.post__photos > #carousel_Photos > div.carousel-inner > div.carousel-item',
            (els) => {
                return els.map((el) => {
                    const img = el.querySelector('img');
                    return img ? img.src : null; // Kiểm tra nếu <img> tồn tại
                }).filter((src) => src); // Loại bỏ các giá trị null
            }
        );

        console.log('>> Ảnh chi tiết:', detailData.images);

        // Thông tin mô tả
        const mainContent = await pageDetail.$eval('main', (el) => {
            
        })

        // Trả về object detailData
        return detailData;
    } catch (error) {
        console.log('Lấy data detail lỗi:', error.message);
        return null;
    } finally {
        if (pageDetail) {
            await pageDetail.close();
            console.log('>> Đã đóng tab ' + link);
        }
    }
};


const scraper = async (browser, url) => {
    return new Promise(async (resolve, reject) => {
        let newPage = null;
        try {
            newPage = await browser.newPage();
            console.log('>> Đã mở tab mới ...');
            await newPage.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
            console.log('>> Đã truy cập vào trang ' + url);
            await newPage.waitForSelector('main');
            console.log('>> Đã load xong tag main...');

            const scrapeData = {};

            // Lấy header
            const headerData = await newPage.$eval('header.mt-2.mb-3', (el) => ({
                title: el.querySelector('h1')?.innerText || 'Không tìm thấy tiêu đề',
                description: el.querySelector('p')?.innerText || 'Không tìm thấy mô tả'
            }));
            scrapeData.header = headerData;
            console.log('>> Header data:', headerData);

            // Lấy toàn bộ các phần tử <li> trong .post__listing
            const detailLinks = await newPage.$$eval('.post__listing > li', (items) =>
                items.map((item) => ({
                    link: item.querySelector('a') ? item.querySelector('a').href : null
                }))
            );
            console.log('>> Danh sách links:', detailLinks);

            // Gọi scraperDetail cho từng link và lưu dữ liệu chi tiết
            const details = [];
            for (let { link } of detailLinks) {
                if (link) {
                    const detail = await scraperDetail(browser, link);
                    if (detail) details.push({ link, ...detail });
                }
            }

            scrapeData.links = details; // Thêm dữ liệu chi tiết vào kết quả
            resolve(scrapeData);
        } catch (error) {
            console.log('Lỗi ở scrape controller:', error.message);
            reject(error);
        } finally {
            if (newPage) {
                await newPage.close();
                console.log('>> Đã đóng tab chính.');
            }
            await browser.close();
            console.log('>> Trình duyệt đã đóng.');
        }
    });
};

module.exports = {
    scrapeCategory,
    scraper
};
