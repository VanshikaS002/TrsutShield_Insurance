import React from 'react';
import { motion } from 'motion/react';

// 1. Import your local images from the assets folder
import c1 from '../assets/c1.jpg';
import c2 from '../assets/c2.jpg';
import c3 from '../assets/c3.jpg';
import c4 from '../assets/c4.jpg';

const galleryImages = [
  {
    url: c1, // Use the imported variable here
    // title: 'LIC Jeevan Utsav',
    // category: 'Life Insurance'
  },
  {
    url: c2,
    // title: 'LIC Nav Jeevan Shri',
    // category: 'Savings Plan'
  },
  {
    url: c3,
    // title: 'LIC Protection Plus',
    // category: 'Term Plan'
  },
  {
    url: c4,
    // title: 'LIC Bima Lakshmi',
    // category: 'Women Special'
  },
  // Reusing local images for the last two, or you can add c5/c6 if you have them
//   {
//     url: c1, 
//     title: 'LIC Bima Kavach',
//     category: 'Protection'
//   },
//   {
//     url: c2,
//     title: 'LIC Jeevan Utsav Special',
//     category: 'Investment'
//   }
];

export const GalleryPanel: React.FC = () => {
  return (
    <section className="mb-32">
      <div className="mb-12">
        <h2 className="text-4xl font-bold tracking-tight mb-4 text-slate-900">Gallery</h2>
        <p className="text-slate-600"></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative h-48 rounded-3xl overflow-hidden glass cursor-pointer"
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              // Removed referrerPolicy as it is not needed for local assets
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">
                {image.category}
              </span>
              <h4 className="text-white font-bold text-lg">{image.title}</h4>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};