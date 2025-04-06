import icons from "./icons";

const { ImPencil2, MdOutlineLibraryBooks, BiUserPin } = icons;

const menuManage = [
  {
    id: 1,
    text: "Đăng tin cho thuê",
    path: "/system/create-new",
    icon: <ImPencil2 />,
  },
  {
    id: 2,
    text: "Quản lý tin đăng",
    path: "/system/manage-post",
    icon: <MdOutlineLibraryBooks />,
  },
  {
    id: 3,
    text: "Thông tin tài khoản",
    path: "/system/profile",
    icon: <BiUserPin />,
  },
];

export default menuManage;
