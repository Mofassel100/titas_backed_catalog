import { Model } from 'mongoose';
export type IImage = {
  userEmail: string;
  image: string;
  imageTitle: string;
};
export type ImageModel = Model<IImage, Record<string, unknown>>;
