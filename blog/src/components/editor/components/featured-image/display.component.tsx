"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/icon/icon.component";

export enum LoadingStatus {
  NONE = "none",
  LOADING = "loading",
  LOADED = "loaded",
}

type FeaturedImageDisplayProps = {
  status: LoadingStatus;
  featuredImageSrc?: string;
};

const FeaturedImageDisplay: React.FC<FeaturedImageDisplayProps> = ({
  status,
  featuredImageSrc,
}) => {
  return (
    <AnimatePresence>
      {status === LoadingStatus.NONE && (
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0, position: "absolute" }}
          key={LoadingStatus.NONE}
          className="flex flex-col justify-center items-center"
        >
          <h2 className="text-xl">Upload your image</h2>
          <Icon name="upload" />
        </motion.div>
      )}

      {status === LoadingStatus.LOADING && (
        <motion.p
          className="text-center absolute"
          key={LoadingStatus.LOADING}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ opacity: 0, position: "absolute" }}
        >
          Loading...
        </motion.p>
      )}

      {status === LoadingStatus.LOADED && (
        <motion.img
          className="text-center object-cover w-full h-full"
          src={featuredImageSrc}
          key={LoadingStatus.LOADED}
          initial={{ opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        ></motion.img>
      )}
    </AnimatePresence>
  );
};

export { FeaturedImageDisplay };
