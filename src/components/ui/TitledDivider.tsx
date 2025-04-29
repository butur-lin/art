'use client';

import { motion } from 'framer-motion';
import React from 'react';

export const TitledDivider = ({ title }: { title: string }) => {
  return (
    <section className="py-8 px-6 md:px-20 bg-gray-50">
      <div className="relative my-12">
        <div className="h-px bg-gray-300 mx-6" />
        <div className="absolute left-1/2 -translate-x-1/2 -top-6">
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              initial={{ x: -150, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="bg-green-600 shadow-md shadow-green-500 px-5 py-1"
            >
              <motion.div
                initial={{ x: -200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="bg-green-800 text-white px-16 py-2 -translate-x-2 -translate-y-2"
              >
                {title}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
