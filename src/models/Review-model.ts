
import { Schema, model, Document, Types } from 'mongoose';

interface IReview extends Document {
  content: string;
  business: Types.ObjectId;
  user: Types.ObjectId;
  likes: Types.ObjectId[]; // Array of Like references
}

const reviewSchema = new Schema<IReview>({
  content: {
    type: String,
    required: true,
  },
  business: {
    type: Schema.Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Like',
    },
  ],
});

const Review = model<IReview>('Review', reviewSchema);

export default Review;


