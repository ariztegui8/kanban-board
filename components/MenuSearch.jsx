import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import avatar1 from '../assets/avatar1.png'
import avatar2 from '../assets/avatar2.png'
import avatar3 from '../assets/avatar3.png'
import avatar4 from '../assets/avatar4.png'
import avatar5 from '../assets/avatar5.png'
import avatar6 from '../assets/avatar6.png'
import MenuNavegation from "./MenuNavegation"
import Search from "./Search"

const MenuSearch = () => {

    const avatars = [
        { src: avatar1, fallback: "CN", id: 1 },
        { src: avatar2, fallback: "OC", id: 2},
        { src: avatar3, fallback: "HB", id: 3},
        { src: avatar4, fallback: "GH", id: 4},
        { src: avatar5, fallback: "MJ", id: 5},
        { src: avatar6, fallback: "DF", id: 6},
        { src: "", fallback: "+10", id: 7},
      ];

  return (
    <div className="flex items-center justify-between py-4 px-4 shadow-md ">
        <div className="flex gap-1">
            {avatars.map(avatar => (
                 <Avatar key={avatar.id}>
                    <AvatarImage src={avatar.src.src} />
                    <AvatarFallback>{avatar.fallback}</AvatarFallback>
                </Avatar>
            ))}
        </div>

        <div>
            <MenuNavegation />
        </div>

        <div>
            <Search />
        </div>
    </div>
  )
}

export default MenuSearch