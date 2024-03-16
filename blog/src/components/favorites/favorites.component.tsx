import { Icon } from "@/components/icon/icon.component";
import { animated, SpringValue } from "@react-spring/web";

type FavoritesProps = {
  children?: React.ReactNode;
  style: Record<string, SpringValue>;
  onClose: () => void;
};

const Favorites: React.FC<FavoritesProps> = ({ children, onClose, style }) => {
  return (
    <animated.aside
      className="fixed top-0 h-screen w-screen bg-black-900/10 opacity-0"
      style={{ opacity: style.opacity }}
      onClick={onClose}
    >
      <animated.div
        className="absolute right-full top-0 flex h-full w-full flex-col bg-white px-10 py-8 shadow-lg shadow-black-500/20 md:w-1/2 lg:w-1/3"
        style={{ right: style.right }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-medium tracking-wider">Favorites</h1>
          <button onClick={onClose}>
            <Icon name="close" />{" "}
          </button>
        </header>

        {children}
      </animated.div>
    </animated.aside>
  );
};

export { Favorites };
