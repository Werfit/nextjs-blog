"use client";
import { Icon } from "@/components/icon/icon.component";
import { animated, SpringValue } from "@react-spring/web";

type FavoritesProps = {
  style: Record<string, SpringValue>;
  onClose: () => void;
};

const Favorites: React.FC<FavoritesProps> = ({ onClose, style }) => (
  <animated.aside
    className="w-screen h-screen fixed bg-black-900/10 top-0 opacity-0"
    style={{ opacity: style.opacity }}
    onClick={onClose}
  >
    <animated.div
      className="absolute w-1/3 h-full top-0 bg-white shadow-lg shadow-black-500/20 px-10 py-8 right-full flex flex-col"
      style={{ right: style.right }}
      onClick={(e) => e.stopPropagation()}
    >
      <header className="flex justify-between items-center">
        <h1 className="text-xl tracking-wider font-medium">Favorites</h1>
        <button onClick={onClose}>
          <Icon name="close" />{" "}
        </button>
      </header>

      <div className="text-sm tracking-wider text-gray-500 flex flex-grow items-center justify-center">
        No favorites here yet...
      </div>
    </animated.div>
  </animated.aside>
);

export { Favorites };
