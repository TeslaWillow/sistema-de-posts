import { IsString, IsEmail, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateCommentDto {
  @IsMongoId() // Validate that it's a valid MongoDB ID
  @IsNotEmpty()
  postId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail() // Validate email format
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  body: string;
}
