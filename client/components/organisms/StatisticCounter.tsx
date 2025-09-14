'use client';

import { statistics } from '@/public/dummy/general';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React from 'react';
import CountUp from 'react-countup';

const StatisticCounter = () => {
  const t = useTranslations('home');

  return (
    <div className="flex flex-col xl:flex-row items-center mt-5 lg:mt-12 max-sm:px-4">
      {statistics.map((statistic, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className="xl:px-8 xl:border-r border-gray-300 first:pl-0 last:border-r-0 xl:text-center max-lg:not-first:mt-4 max-sm:w-[50%] max-sm:inline-block"
        >
          <h1 className="text-4xl font-bold text-primary max-lg:text-center max-sm:text-left">
            <CountUp
              end={statistic.quantity}
              duration={1.5}
              separator=","
              suffix="+"
            />
          </h1>
          <p className="text-base text-muted-foreground mt-2 max-lg:text-center max-sm:text-left">
            {t(statistic.title)}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatisticCounter;
