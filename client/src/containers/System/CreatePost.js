import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Overview, Address, Button } from "../../components";
import { BsCameraFill, BsTrash } from "react-icons/bs";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Swal from "sweetalert2";
import { apiCreatePost } from "../../services/post";

const CreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    categoryCode: "",
    title: "",
    star: 0,
    priceNumber: 0,
    acreageNumber: 0,
    images: [],
    address: "",
    priceCode: "",
    acreageCode: "",
    description: "",
    target: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!payload.title.trim()) {
      newErrors.title = "Vui lòng nhập tiêu đề";
    } else if (payload.title.length < 10) {
      newErrors.title = "Tiêu đề phải có ít nhất 10 ký tự";
    }

    if (!payload.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ";
    }

    if (!payload.categoryCode) {
      newErrors.categoryCode = "Vui lòng chọn loại phòng";
    }

    if (!payload.priceNumber || payload.priceNumber <= 0) {
      newErrors.priceNumber = "Vui lòng nhập giá phòng hợp lệ";
    }

    if (!payload.acreageNumber || payload.acreageNumber <= 0) {
      newErrors.acreageNumber = "Vui lòng nhập diện tích hợp lệ";
    }

    if (!payload.images || payload.images.length === 0) {
      newErrors.images = "Vui lòng thêm ít nhất 1 ảnh phòng";
    }

    if (!payload.description.trim()) {
      newErrors.description = "Vui lòng nhập mô tả phòng";
    } else if (payload.description.length < 20) {
      newErrors.description = "Mô tả phải có ít nhất 20 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [payload]);

  const resetForm = useCallback(() => {
    setPayload({
      categoryCode: "",
      title: "",
      star: 0,
      priceNumber: 0,
      acreageNumber: 0,
      images: [],
      address: "",
      priceCode: "",
      acreageCode: "",
      description: "",
      target: ""
    });
    setErrors({});
  }, []);

  const onChangePayload = useCallback((key, value) => {
    setPayload(prev => ({
      ...prev,
      [key]: value
    }));
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({
        ...prev,
        [key]: ""
      }));
    }
  }, [errors]);

  const onFileChange = useCallback((e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];
    const invalidFiles = [];

    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        invalidFiles.push(`${file.name} - Kích thước quá lớn`);
        return;
      }

      if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
        invalidFiles.push(`${file.name} - Không phải file ảnh`);
        return;
      }

      validFiles.push(file);
    });

    if (invalidFiles.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'File không hợp lệ',
        html: invalidFiles.join('<br>'),
      });
    }

    if (validFiles.length > 0) {
      const newImages = [...payload.images, ...validFiles];
      onChangePayload("images", newImages);
      setErrors(prev => ({
        ...prev,
        images: ""
      }));
    }
  }, [payload.images, onChangePayload]);

  const handleDragEnd = useCallback((result) => {
    if (!result.destination) return;

    const items = Array.from(payload.images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onChangePayload("images", items);
  }, [payload.images, onChangePayload]);

  const removeImage = useCallback((index) => {
    const newImages = [...payload.images];
    newImages.splice(index, 1);
    onChangePayload("images", newImages);
  }, [payload.images, onChangePayload]);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('onSubmit function called!');

    if (!validateForm()) {
      console.log('Form validation failed. Errors:', errors);
      await Swal.fire({
        icon: 'error',
        title: 'Vui lòng kiểm tra lại thông tin',
        text: 'Một số thông tin chưa được điền đầy đủ hoặc chưa hợp lệ.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Log the payload being sent
      Object.keys(payload).forEach(key => {
        if (key === 'images') {
          payload.images.forEach((image, index) => {
            console.log(`Adding image ${index}:`, image.name);
            formData.append('images', image);
          });
        } else {
          console.log(`Adding ${key}:`, payload[key]);
          formData.append(key, payload[key]);
        }
      });

      console.log('Calling API...');
      const response = await apiCreatePost(formData);
      console.log('API Response:', response);

      if (response?.data?.err === 0) {
        await Swal.fire({
          icon: 'success',
          title: 'Đăng tin thành công!',
          text: 'Bài đăng của bạn đã được tạo và đang chờ duyệt',
          showConfirmButton: true,
          confirmButtonText: 'Xem tin đăng',
          confirmButtonColor: '#3085d6',
          showCancelButton: true,
          cancelButtonText: 'Đăng tin mới',
          cancelButtonColor: '#d33',
          timer: 5000,
          timerProgressBar: true,
          willClose: () => {
            navigate('/quan-ly-tin-dang');
          }
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/quan-ly-tin-dang');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            resetForm();
          }
        });
      } else {
        throw new Error(response?.data?.msg || 'Có lỗi xảy ra khi tạo bài đăng');
      }
    } catch (err) {
      console.error('Error details:', {
        message: err.message,
        response: err.response,
        stack: err.stack
      });

      await Swal.fire({
        icon: 'error',
        title: 'Có lỗi xảy ra',
        text: err.response?.data?.msg || err.message || "Đăng tin thất bại, thử lại sau.",
        showConfirmButton: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="px-6"
      onSubmit={(e) => {
        console.log('Form submitted');
        onSubmit(e);
      }}
    >
      <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
        Đăng tin mới
      </h1>

      <div className="flex gap-4">
        <div className="py-4 flex flex-col gap-8 flex-auto">
          <Address
            value={payload.address}
            onChange={val => onChangePayload("address", val)}
            error={errors.address}
          />

          <Overview
            payload={payload}
            onChangePayload={onChangePayload}
            errors={errors}
          />

          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-xl py-4">Hình ảnh</h2>
            <small className="text-gray-500 text-sm">
              Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn
            </small>
            <div className="flex flex-col gap-4">
              {payload.images.length === 0 && (
                <div className="w-full border-2 border-dashed border-gray-300 rounded-lg">
                  <label
                    htmlFor="file"
                    className={`cursor-pointer w-full h-[296px] flex flex-col items-center justify-center gap-4 
                               ${errors.images ? 'text-red-500' : 'text-gray-500'}`}
                  >
                    <BsCameraFill size={50} />
                    <div className='flex'>
                      <span className="text-base font-medium">Thêm ảnh</span>
                      <span className='text-red-500'>(*)</span>
                    </div>
                    <span className="text-sm text-gray-400">(Kéo thả để sắp xếp)</span>
                  </label>
                </div>
              )}

              <input
                id="file"
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={onFileChange}
              />

              {errors.images && (
                <span className="text-red-500 text-sm">{errors.images}</span>
              )}

              {payload.images.length > 0 && (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="images" direction="horizontal" type="image">
                    {(provided, snapshot) => (
                      <div className="relative">
                        <div
                          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${snapshot.isDraggingOver ? 'bg-gray-50' : ''
                            }`}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {payload.images.map((image, index) => (
                            <Draggable
                              key={`image-${index}`}
                              draggableId={`image-${index}`}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`relative aspect-[4/3] group ${snapshot.isDragging ? 'opacity-50' : ''
                                    }`}
                                >
                                  <img
                                    src={URL.createObjectURL(image)}
                                    alt={`preview-${index}`}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg">
                                    <button
                                      type="button"
                                      onClick={() => removeImage(index)}
                                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                    >
                                      <BsTrash size={14} />
                                    </button>
                                  </div>
                                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                                    Ảnh {index + 1}
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          <div className="relative aspect-[4/3]">
                            <label
                              htmlFor="file"
                              className="cursor-pointer w-full h-full border-2 border-dashed border-gray-300 rounded-lg
                                       flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-gray-600"
                            >
                              <BsCameraFill size={30} />
                              <span className="text-sm font-medium">Thêm ảnh</span>
                            </label>
                          </div>
                          {provided.placeholder}
                        </div>
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </div>
          </div>

          <Button
            text={isSubmitting ? 'Đang đăng tin...' : 'Đăng tin'}
            textColor="text-white"
            bgColor="bg-blue-600 hover:bg-blue-700"
            type="submit"
            fullWidth
            disabled={isSubmitting}
          />
        </div>
        <div className="w-[30%] flex-none">maps</div>
      </div>
    </form>
  );
};

export default CreatePost;
