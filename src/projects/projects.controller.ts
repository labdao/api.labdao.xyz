import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ParseEthereumAddress } from 'src/pipes/parse-ethereum-address.pipe';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.remove(+id);
  }

  @Get('wallet/:walletAddress')
  async findByWalletAddress(
    @Param('walletAddress', ParseEthereumAddress) walletAddress: string,
  ) {
    return this.projectsService.findUserByWalletAddress(walletAddress);
  }

  // @Patch('wallet/:walletAddress')
  // async findByWalletAddress(
  //   @Param('walletAddress', ParseEthereumAddress) walletAddress: string,
  // ) {
  //   return this.usersService.findByWalletAddress(walletAddress);
  // }
}
