import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  public async createBulk(posts: CreatePostDto[]) {
    const result = await this.postModel.insertMany(posts);
    return result;
  }

  public async findAll() {
    return await this.postModel.find().exec();
  }

  public async findOne(id: string) {
    return await this.postModel.findById(id).exec();
  }

  public async update(id: string, updatePostDto: CreatePostDto) {
    return await this.postModel
      .findByIdAndUpdate(id, updatePostDto, { new: true })
      .exec();
  }

  public async remove(id: string) {
    return await this.postModel.findByIdAndDelete(id).exec();
  }
}
