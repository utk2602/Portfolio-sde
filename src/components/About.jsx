"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import PinContainer from "../components/ui/3d-pin"
import { styles } from "../styles"
import { services } from "../constants"
import { SectionWrapper } from "../hoc"
import { fadeIn, textVariant } from "../utils/motion"

const About = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(null)
  const scrollRef = useRef(null)

  const handleCardClick = (index) => {
    setActiveCardIndex(activeCardIndex === index ? null : index)
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollAmount = clientWidth / 1.2 
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <>
      <motion.div variants={textVariant()} className="text-center">
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] text-center mx-auto"
      >
        I'm a skilled software developer with experience in JavaScript and expertise in frameworks like React, Node.js,
        and Three.js. I'm a quick learner and collaborate closely with clients to create efficient, scalable, and
        user-friendly solutions that solve real-world problems. Let's work together to bring your ideas to life!
      </motion.p>

      {/* Service Section */}
      <div className="mt-20 flex flex-col items-center relative">
        {/* Arrows only for Mobile */}
        <button
          className="absolute left-0 z-20 p-3 bg-gray-900/70 text-white rounded-full hover:bg-gray-800 transition md:hidden"
          onClick={() => scroll("left")}
        >
          <IoIosArrowBack size={24} />
        </button>

        {/* Scrollable for mobile, grid for large screens */}
        <div
          ref={scrollRef}
          className="flex gap-x-10 overflow-x-auto scroll-smooth no-scrollbar px-4 md:grid md:grid-cols-3 md:gap-10 md:overflow-visible"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50, rotateY: 25 }}
              animate={{
                opacity: 1,
                y: 0,
                rotateY: 0,
                transition: {
                  duration: 0.8,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                },
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                z: 20,
                transition: { duration: 0.3 },
              }}
              style={{ perspective: 1000 }}
              onClick={() => handleCardClick(index)}
              className="flex-shrink-0 w-[15rem] mx-auto md:w-full" 
            >
              <motion.div
                animate={{
                  boxShadow:
                    activeCardIndex === index ? "0 0 25px rgba(138, 75, 255, 0.7)" : "0 0 0 rgba(138, 75, 255, 0)",
                }}
                transition={{
                  duration: 0.5,
                }}
              >
                <PinContainer title={service.title} href="#">
                  <div className="relative flex flex-col items-center p-4 w-[15rem] h-[8rem] bg-opacity-30 rounded-lg shadow-lg z-10">
                    {/* Animated gradient background - only active when clicked */}
                    <motion.div
                      className="absolute -z-10 w-full h-full bg-gradient-to-r from-purple-500 to-indigo-600 blur-3xl rounded-lg"
                      animate={{
                        opacity: activeCardIndex === index ? 0.7 : 0.3,
                        scale: activeCardIndex === index ? 1.2 : 1,
                      }}
                      transition={{
                        duration: 0.5,
                      }}
                    />

                    {/* Content */}
                    <motion.img
                      src={service.icon}
                      alt={service.title}
                      className="w-16 h-16 object-contain"
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                      whileHover={{
                        rotate: 360,
                        scale: 1.2,
                        transition: { duration: 0.8 },
                      }}
                    />
                    <motion.h3
                      className="text-white text-[18px] font-bold mt-3 text-center w-full"
                      animate={{
                        textShadow:
                          activeCardIndex === index
                            ? "0 0 10px rgba(255, 255, 255, 0.8)"
                            : "0 0 0px rgba(255, 255, 255, 0)",
                      }}
                      transition={{
                        duration: 0.5,
                      }}
                    >
                      {service.title}
                    </motion.h3>
                  </div>
                </PinContainer>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-0 z-20 p-3 bg-gray-900/70 text-white rounded-full hover:bg-gray-800 transition md:hidden"
          onClick={() => scroll("right")}
        >
          <IoIosArrowForward size={24} />
        </button>
      </div>
    </>
  )
}

export default SectionWrapper(About, "about")
