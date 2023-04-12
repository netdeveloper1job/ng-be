import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { NoteStatus } from "src/notes/entities/status.enum";


export class CreateNoteDto {

    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    userId: string;

;

    @ApiProperty({ default: NoteStatus.INACTIVE })
    @IsNotEmpty()
    @IsEnum(NoteStatus)
    status: NoteStatus;
}
