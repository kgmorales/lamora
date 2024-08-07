import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { categoryNames } from '@components/sections/constants/Hero';
import { useRouter } from 'next/router';

const length = Math.ceil(categoryNames.length / 2);
const firstHalf = categoryNames.slice(0, length);
const secondHalf = categoryNames.slice(length);
const copyrightYear = new Date().getFullYear();

const Footer: React.FC = () => {
  const router = useRouter();

  const handleCategoryClick = (categoryTitle: string) => {
    router.push(`/recipes?category=${categoryTitle}`);
  };

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-1">
            <div className="row">
              <div className="col-lg-8 mb-30">
                <Link
                  className="wow animate__animated animate__fadeInUp"
                  href="/"
                >
                  <Image
                    alt="lamora logo"
                    className="logo-night"
                    src="/assets/imgs/lamora-logo-night.svg"
                    width={100}
                    height={100}
                  />
                  <Image
                    className="d-none logo-day"
                    alt="lamora logo"
                    src="/assets/imgs/lamora-logo.svg"
                    width={100}
                    height={100}
                  />
                </Link>
                <p className="mb-20 mt-20 color-gray-300 text-sm wow animate__animated animate__fadeInUp">
                  Join the Morales Family&apos;s culinary journey, where family
                  recipes are not just preserved but cherished. laMora Recipes
                  are intended to be shared to foster bonds that are as
                  comforting and warm as the dishes themselves.
                </p>
              </div>
              <div className="col-lg-4 mb-30">
                <h6 className="text-lg mb-30 color-gray-300 wow animate__animated animate__fadeInUp">
                  Categories
                </h6>
                <div className="row">
                  <div className="col-6">
                    <ul className="menu-footer">
                      {firstHalf?.map((category) => (
                        <li
                          key={category.key}
                          className="wow animate__animated animate__fadeInUp"
                          onClick={() => handleCategoryClick(category.name)}
                        >
                          <p className="color-gray-300">{category.name}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-6">
                    <ul className="menu-footer">
                      {secondHalf?.map((category) => (
                        <li
                          key={category.key}
                          className="wow animate__animated animate__fadeInUp"
                          onClick={() => handleCategoryClick(category.name)}
                        >
                          <p className="color-gray-300">{category.name}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-bottom border-gray-800">
              <small className="text-small color-gray-300 wow animate__animated animate__fadeIn">
                © {copyrightYear} created by
                <Link
                  className="copyright"
                  href="https://kevinmoral.es"
                  target="_blank"
                >
                  {' '}
                  kevinmoral.es
                </Link>
              </small>
              <div className="box-socials">
                <div
                  className=" wow animate__animated animate__fadeIn"
                  data-wow-delay=".4s"
                >
                  <Link
                    className="icon-socials icon-insta"
                    href="https://www.instagram.com/lamora_recipes"
                  >
                    <Image
                      className="logo-night"
                      alt="lamora logo"
                      src="/assets/icons/insta.svg"
                      width={40}
                      height={40}
                    />
                    <Image
                      className="d-none logo-day"
                      alt="lamora logo"
                      src="/assets/icons/insta-day.svg"
                      width={40}
                      height={40}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
