import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { RefreshInput } from './dto/refresh-input.dto';


@Injectable()
export class AuthService {
    constructor(@Inject(forwardRef(() => UserService)) private userService: UserService, private jwtService: JwtService) { }

    async validateUser(username: string, password: string): Promise<any> {

        const user = await this.userService.findOneByUsername(username)
        if (!user) {

            return null

        }

        const valid = await bcrypt.compare(password, user.password);

        if (user && valid) {

            const { password, ...result } = user;
            return result;

        }

        return null;
    }

    async login(user: User, res: any) {


        const access_token = this.jwtService.sign({
            username: user.personalUsername,
            sub: user.id,
        })

        res.cookie('Authentication', access_token, {
            httpOnly: true,
            expires: new Date(new Date().getTime() + 1200 * 1000)
            //expires: new Date(new Date().getTime() + 60 * 1000)
            // expires: new Date(new Date().getTime() + 360 * 1000)
        })


        // const refresh_token = this.jwtService.sign({
        //     username: user.password,
        //     sub: user.id
        // })

        // res.cookie('Refresh',refresh_token,{
        //     httpOnly:true,
        //     //expires: new Date(new Date().getTime() + 60 * 1000)
        //     expires: new Date(new Date().getTime() + 360 * 24 * 1000)
        // })


        return {
            status: "successfull",
            user
        }
    }

    async logout(res: any) {

        res.cookie('Authentication', '', {
            httpOnly: true,
            expires: new Date(new Date().getTime() + 60 * 1000)
        })


        // res.cookie('Refresh','',{
        //     httpOnly:true,
        //     expires: new Date(new Date().getTime() + 60 * 1000)
        // })


        return {
            status: "logged out"
        }

    }

    async regen(refreshInput: RefreshInput, res: any) {

        const access_token = this.jwtService.sign({
            username: refreshInput.username,
            sub: refreshInput.id,
        })

        res.cookie('Authentication', access_token, {
            httpOnly: true,
            expires: new Date(new Date().getTime() + 60 * 1000)
            // expires: new Date(new Date().getTime() + 360 * 1000)
        })

        return {
            status: "successfull",
            // user
        }

    }

}
