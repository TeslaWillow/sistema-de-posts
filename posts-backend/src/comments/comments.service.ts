import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async findByPost(postId: string) {
    return await this.commentModel
      .find({ postId: new Types.ObjectId(postId) })
      .exec();
  }

  async create(createCommentDto: CreateCommentDto) {
    const newComment = new this.commentModel({
      ...createCommentDto,
      postId: new Types.ObjectId(createCommentDto.postId), // Convert postId to ObjectId
    });
    return await newComment.save();
  }

  async remove(id: string) {
    return await this.commentModel.findByIdAndDelete(id).exec();
  }
}
