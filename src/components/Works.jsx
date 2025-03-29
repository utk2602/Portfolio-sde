import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github, externalLink } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_demo_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 25,
          scale: 1.05,
          speed: 400,
        }}
        className='bg-tertiary p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 sm:w-[360px] w-full'
      >
        <div className='relative w-full h-[230px] rounded-2xl overflow-hidden'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl transform hover:scale-105 transition-transform duration-300'
          />
          <div className='absolute inset-0 flex justify-end m-3 gap-2 card-img_hover'>
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className='bg-gray-900 bg-opacity-80 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-opacity-100 transition-all duration-300'
            >
              <img
                src={github}
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
            {live_demo_link && (
              <div
                onClick={() => window.open(live_demo_link, "_blank")}
                className='bg-blue-600 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-500 transition-all duration-300'
              >
                <img
                  src={externalLink}
                  alt='live demo'
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
            )}
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-gray-400 text-[14px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] px-3 py-1 rounded-full bg-gray-700 text-white`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-gray-400`}>My work</p>
        <h2 className={`${styles.sectionHeadText} text-white`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-gray-300 text-[17px] max-w-3xl leading-[30px]'
        >
          Following projects showcase my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos. It reflects my ability to
          solve complex problems, work with different technologies, and manage
          projects effectively.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap justify-center gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");