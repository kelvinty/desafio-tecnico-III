import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  // cache em memória (em produção, use Redis ou banco)
  private cache = new Map<string, any>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const idempotencyKey = request.headers['idempotency-key'];
    const method = request.method.toUpperCase();

    if (method !== 'POST') {
      return next.handle(); // Só aplica POST
    }

    if (!idempotencyKey) {
      throw new BadRequestException('Cabeçalho Idempotency-Key é obrigatório');
    }

    // Se a chave já foi usada, retorna a resposta anterior
    if (this.cache.has(idempotencyKey)) {
      console.log(`🌀 Requisição repetida: ${idempotencyKey}`);
      return of(this.cache.get(idempotencyKey));
    }

    // Caso contrário, processa e salva a resposta
    return next.handle().pipe(
      tap((response) => {
        console.log(`💾 Salvando resposta para chave: ${idempotencyKey}`);
        this.cache.set(idempotencyKey, response);
      }),
    );
  }
}
