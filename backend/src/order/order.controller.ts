import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { GetOrderDTO } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() data: GetOrderDTO) {
    return this.orderService.create(data);
  }
}
