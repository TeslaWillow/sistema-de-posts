import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiResponse } from '../common/responses/api-response.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // GET [/comments?postId=...]
  @Get()
  async findByPost(@Query('postId') postId: string) {
    if (!postId)
      return ApiResponse.error(
        'El postId es requerido en el query string',
        400,
      );
    const comments = await this.commentsService.findByPost(postId);
    return ApiResponse.success(comments);
  }

  // POST [/comments]
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    const comment = await this.commentsService.create(createCommentDto);
    return ApiResponse.success(comment, 'Comentario creado');
  }

  // DELETE [/comments/:id]
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.commentsService.remove(id);
    if (!deleted) return ApiResponse.error('Comentario no encontrado', 404);
    return ApiResponse.success(null, 'Comentario eliminado');
  }
}
