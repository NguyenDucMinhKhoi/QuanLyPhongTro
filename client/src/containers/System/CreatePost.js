import React from "react";
import { Overview, Address } from "../../components";
import { BsCameraFill } from "react-icons/bs"

const CreatePost = () => {
  return (
    <div className="px-6">
      <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
        Đăng tin mới
      </h1>
      <div className="flex gap-4">
        <div className="py-4 flex flex-col gap-8 flex-auto">
          <Address />
          <Overview />
          <div className='flex flex-col gap-2'>
            <h2 className='font-semibold text-xl py-4'>Hình ảnh</h2>
            <small className='text-gray-500 text-sm'>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
            <div className="flex items-center gap-2">
              <label className="cursor-pointer w-full border h-[200px] border-dashed border-gray-400 rounded-md flex flex-col items-center justify-center my-4 gap-4" htmlFor="file">
                <BsCameraFill color="gray" size={50} />
                <span className="text-sm">Thêm ảnh</span>
              </label>
              <input hidden type="file" id="file" />
            </div>
          </div>
          <div className='h-[500px]'>

          </div>
        </div>
        <div className="w-[30%] flex-none">maps</div>
      </div>
    </div>
  );
};

export default CreatePost;
