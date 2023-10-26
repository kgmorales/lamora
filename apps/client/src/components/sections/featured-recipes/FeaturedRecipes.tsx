import Link from 'next/link';

import FeaturedCard from '@components/elements/featured-card/FeaturedCard';
import styles from './FeaturedRecipes.module.scss';
import { processRecipeForCard } from '../utils/Home.utils';
import { FeaturedCardData, Home } from '@types';

interface FeaturedRecipesProps {
  featured?: Home['favorites'];
}

const FeaturedRecipes: React.FC<FeaturedRecipesProps> = ({ featured }) => {
  const cardInfo = processRecipeForCard(featured);
  console.log(cardInfo);

  return (
    <>
      <div className="row mt-70">
        <div className={styles.cardContainer}>
          {cardInfo?.map((recipe: FeaturedCardData) => (
            <div key={recipe.id}>
              <FeaturedCard cardInfo={recipe} />
            </div>
          ))}
        </div>

        <div className={styles.buttonContainer}>
          <Link
            className="btn btn-linear btn-load-more wow animate__animated animate__zoomIn"
            href="#"
          >
            Show More Posts
            <i className="fi-rr-arrow-small-right" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default FeaturedRecipes;
