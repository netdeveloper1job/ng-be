import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';

import { UpdateNoteDto } from './dto/request/update-note.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateNoteDto } from './dto/request/create-note.dto';
import { NoteParentRoute, NoteRoutes } from './note.http.routes';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

/* ####################################### SWAGGER DOCUMENTATION : Start ####################################### */
@ApiTags('Note')
/* ######################################## SWAGGER DOCUMENTATION : End ######################################## */


  @Controller({path:NoteParentRoute})
  //@Public()
  @ApiBearerAuth()
  

export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(NoteRoutes.create)
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get(NoteRoutes.view_all)
  findAll() {
    return this.notesService.findAll();
  }

  @Get(NoteRoutes.view_one)
  findOne(@Param('noteId') id: string) {
    return this.notesService.findOne(+id);
  }

  @Post(NoteRoutes.update)
  update(@Param('noteId') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }

  @Delete(NoteRoutes.delete)
  remove(@Param('noteId') id: string) {
    return this.notesService.remove(+id);
  }
}
