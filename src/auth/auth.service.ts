import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { compare, genSalt, hash } from 'bcryptjs'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from 'src/user/user.model'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
	) {}

	async login(dto: AuthDto) {
		const user = await this.UserModel.findOne({ email: dto.email })
		if (!user) throw new UnauthorizedException('User with this email not found')

		const isValidPassword = await compare(dto.password, user.password)
		if (!isValidPassword)
			throw new UnauthorizedException('Password is not correct')

		return user
	}

	async register(dto: AuthDto) {
		const oldUser = await this.UserModel.findOne({ email: dto.email })

		if (oldUser)
			throw new BadRequestException('User with this email already registered')

		const salt = await genSalt()

		const newUser = new this.UserModel({
			email: dto.email,
			password: await hash(dto.password, salt),
		})

		return newUser.save()
	}
}
