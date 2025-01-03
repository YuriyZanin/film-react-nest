import { IsArray, IsEmail, IsNumber, IsString } from 'class-validator';

export class GetTicketDTO {
  @IsString()
  film: string;
  @IsString()
  session: string;
  @IsString()
  daytime: string;
  @IsString()
  day: string;
  @IsString()
  time: string;
  @IsNumber()
  row: number;
  @IsNumber()
  seat: number;
  @IsNumber()
  price: number;
}

export class GetOrderDTO {
  @IsEmail()
  email: string;
  @IsString()
  phone: string;
  @IsArray()
  tickets: GetTicketDTO[];
}
