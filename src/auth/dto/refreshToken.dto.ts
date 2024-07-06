import { IsString } from 'class-validator'

export class RefreshTokenDto {
  @IsString({
    message: 'It is not a refresh token',
  })
  refreshToken: string
}
