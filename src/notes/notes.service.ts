import { Injectable, NotFoundException } from '@nestjs/common';

import { UpdateNoteDto } from './dto/request/update-note.dto';
import { CreateNoteDto } from './dto/request/create-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { NoteWithMessageResponse } from './dto/response/noteWithResponce';
import { NoteStatus } from './entities/status.enum';
import { NoteResponse } from './dto/response/note-response';
import { Messages } from 'src/common/constants/messages';

@Injectable()
export class NotesService {
  constructor(@InjectRepository(Note) private noteRepository: Repository<Note>){

  }
  async create(createNoteDto: CreateNoteDto) {
    const note = await this.noteRepository.save(createNoteDto);
    return note ;
  }

  async findAll(): Promise<NoteResponse[]> {
    return this.noteRepository.find();
  }

 async findOne(noteId: number) {
    try {
      return await this.noteRepository.findOne(
        {
          where:
            { id: noteId, status: NoteStatus.ACTIVE }
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async update(noteId: number, request: UpdateNoteDto): Promise<NoteResponse> {
    const result = await this.noteRepository.update(noteId, request);
    if (!result) {
      throw new NotFoundException(`${Messages.Resource.NotFound} : Note`);
    }

    return this.noteRepository.findOne(noteId);
  }

  async remove(id: number): Promise<NoteResponse> {
    const deletedUser = await this.noteRepository.findOne(id);
    await this.noteRepository.delete(id);
    return deletedUser;
  }
}
