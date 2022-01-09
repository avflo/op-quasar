import {
  IsArray,
  ValidateNested,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';

export class TopSecretDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  satellites: Array<TopSecretSplitDTO>;
}

export class TopSecretSplitDTO {
  distance: number;
  @IsArray()
  message: Array<string>;
}
