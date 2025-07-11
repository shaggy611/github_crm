import {IsNotEmpty, IsString} from "class-validator";

export class CreateProjectDTO {

    @IsString()
    @IsNotEmpty()
    name: string;

}
