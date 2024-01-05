import Head from 'next/head';
import Layout from '../components/layout/Layout';
import AboutHero from '@components/sections/about-hero/AboutHero';
import React from 'react';
import ImageSlider from '@components/elements/ImageSlider';
import AccordionWrapper from '@components/elements/accordion-wrapper/AccordionWrapper';
import RecentPosts2 from '@components/sections/RecentPosts2';

const About: React.FC = (props) => {
  return (
    <>
      <Head>
        <title>Genz - About me</title>
      </Head>
      <Layout>
        <div className="container">
          <div className="row">
            <AboutHero />
            <ImageSlider />
            <RecentPosts2 />
            <AccordionWrapper />
          </div>
        </div>
      </Layout>
    </>
  );
};
export default About;
