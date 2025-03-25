import React, { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const PinContainer = ({ children, title, href, className, containerClassName }) => {
  const [transform, setTransform] = useState("translate(-50%,-50%) rotateX(0deg)");

  return (
    <a
      className={clsx("relative group cursor-pointer", containerClassName)}
      onMouseEnter={() => setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)")}
      onMouseLeave={() => setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)")}
      href={href || "#"}
    >
      <div
        style={{ perspective: "1000px", transform: "rotateX(70deg) translateZ(0deg)" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          style={{ transform }}
          className="absolute left-1/2 p-4 top-1/2 flex justify-start items-start rounded-2xl shadow-lg bg-black border border-white/10 transition duration-700 overflow-hidden"
        >
          <div className={clsx("relative z-50", className)}>{children}</div>
        </div>
      </div>
      <PinPerspective title={title} href={href} />
    </a>
  );
};

const PinPerspective = ({ title, href }) => {
  return (
    <motion.div className="pointer-events-none w-96 h-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
      <div className="w-full h-full -mt-7 flex-none inset-0">
        <div className="absolute top-0 inset-x-0 flex justify-center">
          <a
            href={href}
            target="_blank"
            className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10"
          >
            <span className="relative z-20 text-white text-xs font-bold py-0.5">
              {title}
            </span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default PinContainer;
