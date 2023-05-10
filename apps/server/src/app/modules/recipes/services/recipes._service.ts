//* NESTJS
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

//* MONGOOSE
import { Connection, Model } from 'mongoose';

//* Module
import { RecipeDto } from '@recipes/dtos';
import { ICategory, IRecipe, IRecipeItem } from '@recipes/interfaces';
import { Category, Recipe, RecipeIds } from '@recipes/schemas';
import { PaprikaApiService, PaprikaService } from '@recipes/services';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<IRecipe>,
    @InjectModel(RecipeIds.name) private recipeIDModel: Model<RecipeIds>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectConnection() private readonly connection: Connection,
    private paprikaApiService: PaprikaApiService,
    private paprikaService: PaprikaService
  ) {}

  //* ALL RECIPES IN MONGO
  async allDBRecipes(): Promise<IRecipe[]> {
    return await this.recipeModel.find().exec();
  }

  async allDBCategories(): Promise<ICategory[]> {
    return await this.categoryModel.find().exec();
  }

  /**
   * Create new Recipe and add to Database.
   */
  //* CREATE
  async createRecipe(recipeDto: RecipeDto): Promise<void> {
    const createdRecipe = new this.recipeModel(recipeDto);

    await this.paprikaApiService.create(recipeDto);
    await createdRecipe.save();
  }

  /**
   * Delete all data in Database.
   */
  //* DELETE
  private async deleteAll(): Promise<void> {
    const collections = await this.connection.db.collections();

    await Promise.all(
      collections.map(async (collection) => {
        await collection.deleteMany({});
      })
    );
  }

  async getPaginatedRecipes({ page = 1, limit = 10 }) {
    limit = limit > 100 ? 100 : limit; // Optional: this line caps the limit at 100 items

    const skippedItems = (page - 1) * limit;
    const recipes = await this.recipeModel
      .find()
      .skip(skippedItems)
      .limit(limit)
      .exec();

    return recipes;
  }

  /**
   * Refresh db with new data from Paprika.
   */
  //* REFRESH
  async refreshDB(): Promise<void> {
    await this.deleteAll();
    const allRecipes = await this.paprikaService.allRecipes();
    const allIDs = await this.paprikaService.recipeIds();
    const allCategories = await this.paprikaService.categories();

    await this.recipeModel.insertMany(allRecipes);
    await this.recipeIDModel.insertMany(allIDs);
    await this.categoryModel.insertMany(allCategories);
  }

  /**
   *Updates Database with newly added recipes from paprika.
   * @returns Promise<IRecipe[]>
   */
  //* UPDATE
  async updateRecipes(): Promise<IRecipe[]> {
    const paprikaIds: IRecipeItem[] = await this.paprikaService.recipeIds();
    const dbRecipeCount: number = await this.recipeModel.countDocuments();

    if (paprikaIds.length !== dbRecipeCount) {
      const dbIds = await this.recipeIDModel.find().lean();
      const newRecipeIds = await paprikaIds.filter(
        (paprikaId) => !dbIds.find((dbId) => paprikaId.uid === dbId.uid)
      );

      const newUIDs = newRecipeIds.map((ids) => ids.uid);
      const newRecipes = await this.paprikaService.findByUID(newUIDs.join(''));

      await this.recipeIDModel.collection.insertMany(newRecipeIds);
      await this.recipeModel.collection.insertMany(newRecipes);

      return newRecipes;
    }
    return [];
  }

  /**
   * Find's recipe in Database by UID.
   * @param uid string
   * @returns Promise<IRecipe | null>
   */
  //* FIND BY UID
  async findByUID(uid: Pick<IRecipe, 'uid'>): Promise<IRecipe | null> {
    const foundRecipe = await this.recipeModel.findById(uid);
    return foundRecipe || null;
  }
}
