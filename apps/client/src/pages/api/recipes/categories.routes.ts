import { Category } from '@prisma/client';

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(
      'https://localhost:8080/api/recipes/categories',
    );
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data: Category[] = await response.json();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching all recipes:', error);
    throw new Error('Error fetching all recipes: ' + error.message);
  }
}

export default fetchCategories;
