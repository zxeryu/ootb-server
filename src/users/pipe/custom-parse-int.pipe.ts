import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

export class CustomParseIntPipe implements PipeTransform<string,number>{
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value,10);
    if (isNaN(val)) {
      throw new BadRequestException('Number Validation failed');
    }
    return val;
  }

}
