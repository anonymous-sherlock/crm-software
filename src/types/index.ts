import { IconType } from "react-icons";

export interface newUserResponse extends Response {
  success: boolean;
  message: string;
  callback?: string;
  errors?: string
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
    role: string;
  };
}


// sidebar submenu
interface MenuItem {
  id: string
  label: string;
  url: string;
}

 export interface SubMenuTypes {
  name: string;
  icon: IconType;
  menus: MenuItem[];
}
