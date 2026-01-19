import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiResponse } from 'src/common/responses/api-response.dto';

// Error handling is now managed globally by AllExceptionsFilter

@Controller('posts')
export class PostsController {
  constructor(private readonly _postsService: PostsService) {}

  @Get()
  async findAll() {
    const posts = await this._postsService.findAll();
    return ApiResponse.success(posts);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this._postsService.findOne(id);
    if (!post) return ApiResponse.error('Post no encontrado', 404);
    return ApiResponse.success(post);
  }

  // [POST] [/posts] - Create a new post
  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const post = await this._postsService.create(createPostDto);
    return ApiResponse.success(post, 'Post creado exitosamente');
  }

  @Post('bulk')
  async createBulk(@Body() createPostsDto: CreatePostDto[]) {
    const posts = await this._postsService.createBulk(createPostsDto);
    return ApiResponse.success(posts, 'Posts cargados exitosamente');
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    const updatedPost = await this._postsService.update(id, updatePostDto);
    if (!updatedPost)
      return ApiResponse.error('No se pudo editar: Post no encontrado', 404);
    return ApiResponse.success(updatedPost, 'Post actualizado');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this._postsService.remove(id);
    if (!deleted)
      return ApiResponse.error('No se pudo eliminar: Post no encontrado', 404);
    return ApiResponse.success(null, 'Post eliminado correctamente');
  }
}
