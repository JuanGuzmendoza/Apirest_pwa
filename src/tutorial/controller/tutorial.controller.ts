import { Body, Controller, Get, Post } from '@nestjs/common';
import { TutorialService } from '../service/tutorial.service';
import { NotificacionDto } from '../dto/notificacion-create.dto';
@Controller('tutorial')
export class TutorialController {
  constructor(private readonly tutorialService: TutorialService) {}

  @Post('createData')
  async createData(@Body() data: NotificacionDto): Promise<void> {
    await this.tutorialService.createData(data);
  }

  @Get('getData')
  async getData(): Promise<any> {
    return this.tutorialService.getData();
  }
}
