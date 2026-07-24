import { Controller, Post, Get, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NewsletterService } from './newsletter.service';
import { SubscribeNewsletterDto } from './dto/subscribe-newsletter.dto';

@ApiTags('Newsletter')
@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Subscribe to newsletter' })
  @ApiResponse({ status: 200, description: 'Subscribed successfully.' })
  @ApiResponse({ status: 409, description: 'Email already subscribed.' })
  async subscribe(@Body() dto: SubscribeNewsletterDto) {
    const subscriber = await this.newsletterService.subscribe(dto.email);
    return {
      success: true,
      message: 'Successfully subscribed to the newsletter.',
      data: subscriber,
    };
  }

  @Get('subscribers')
  @ApiOperation({ summary: 'List all newsletter subscribers' })
  async getSubscribers() {
    return this.newsletterService.getAllSubscribers();
  }
}
