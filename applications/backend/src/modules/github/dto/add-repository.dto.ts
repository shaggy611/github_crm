import { IsString, IsNotEmpty } from 'class-validator';

export class AddRepositoryDto {
    @IsString()
    @IsNotEmpty()
    fullName: string;
}
