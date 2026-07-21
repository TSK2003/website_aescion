import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const dbUrl = new URL(process.env.DATABASE_URL || 'postgresql://localhost:5432/postgres');
    const pool = new Pool({
      host: dbUrl.hostname,
      port: Number(dbUrl.port) || 5432,
      user: dbUrl.username,
      password: String(decodeURIComponent(dbUrl.password)),
      database: dbUrl.pathname.slice(1),
    });
    const adapter = new PrismaPg(pool);
    
    super({
      adapter,
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
