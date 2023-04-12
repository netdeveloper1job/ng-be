import { Expose } from "class-transformer";
import { NoteResponse } from "./note-response";
import { ApiProperty } from "@nestjs/swagger";

export class NoteWithMessageResponse {
    @ApiProperty({
      title: 'Message',
      description: 'Specifies a response message',
      example: 'Process Successful',
    })
  
    @Expose()
    message: string;
  
    @ApiProperty({
      title: 'Data',
      description: 'Specifies response data',
    })
  
    @Expose()
    data?: NoteResponse | NoteResponse[];
  
    constructor(message: string, data: NoteResponse | NoteResponse[]) {
      this.data = data;
      this.message = message;
    }
  }