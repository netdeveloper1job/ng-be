import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { NoteStatus } from "src/notes/entities/status.enum";

export class NoteResponse {

    @ApiProperty()
    @Expose()
    id: number;
  
    @ApiProperty()
    @Expose()
    title: string;
  
    @ApiProperty()
    @Expose()
    description: string;

    @ApiProperty()
    @Expose()
    userId: string;
  
    @ApiProperty({ example: NoteStatus })
    @Expose()
    status: NoteStatus;
}