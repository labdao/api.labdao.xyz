import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { isEthereumAddress, isString } from 'class-validator';

@Injectable()
export class ParseEthereumAddress implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!isString(value) || value.length === 0 || !isEthereumAddress(value)) {
      const { type, data } = metadata;
      const internalParamType = type === 'param' ? 'path' : type;
      throw new BadRequestException(
        `Validation failed (Ethereum adddress expected for ${internalParamType} param${
          data ? ` ${data}` : ''
        }`,
      );
    }
    return value;
  }
}
