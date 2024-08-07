import React, { useState, useEffect, useMemo } from 'react';
import { useRecipeCards } from '@hooks';
import { RecipeCard } from '@types';
import FeaturedRecipes from '@components/sections/featured-recipes/FeaturedRecipes';
import { useRouter } from 'next/router';

const RecipeFilter: React.FC = () => {
  const { recipes } = useRecipeCards(); // Fetch all recipes
  const router = useRouter();

  const { category } = router.query as { category?: string };

  const [filter, setFilter] = useState<string>('all');
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeCard[]>([]);

  const categories = useMemo(() => {
    return Array.from(new Set(recipes?.flatMap((recipe) => recipe.categories)));
  }, [recipes]);

  useEffect(() => {
    if (category) {
      setFilter(category);
    } else if (recipes) {
      setFilteredRecipes(recipes);
    }
  }, [category, recipes]);

  // Update the filter based on the query parameter
  useEffect(() => {
    if (category) {
      setFilter(category);
    }
  }, [category]);

  useEffect(() => {
    if (!recipes) return;

    const filtered =
      filter === 'all'
        ? recipes
        : recipes.filter((recipe) => recipe.categories?.includes(filter));

    setFilteredRecipes(filtered);
  }, [filter, recipes]);

  return (
    <>
      <div className="d-flex flex-1 align-center mt-50 ">
        <ul className="list-tags-col-5 mb-50 text-center">
          {/* "All" button */}
          <li>
            <div
              className={`wow animate__animated animate__fadeIn card-style-2 btn hover-up hover-neon hover-shadow justify-content-center ${
                filter === 'all' ? 'active btn-linear d-flex' : ''
              }`}
              onClick={() => setFilter('all')}
            >
              <div className="text-center">
                <h6 className="color-gray-300-only">All</h6>
              </div>
            </div>
          </li>
          {/* Category buttons */}
          {categories &&
            categories.map((category, i) => (
              <li key={i}>
                <div
                  className={`wow animate__animated animate__fadeIn test card-style-2 hover-neon btn hover-up hover-shadow justify-content-center ${
                    filter === category ? 'active btn-linear d-flex' : ''
                  }`}
                  onClick={() => setFilter(category ?? 'all')}
                >
                  <div className="text-center">
                    <h6 className="color-gray-300-only">{category}</h6>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>

      <div className="m-50">
        <div className="row">
          <FeaturedRecipes featured={filteredRecipes} />
        </div>
      </div>
    </>
  );
};

export default RecipeFilter;
