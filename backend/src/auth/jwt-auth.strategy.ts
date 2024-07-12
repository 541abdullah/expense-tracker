import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({

            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: any) => {
                    return request?.cookies?.Authentication;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
            logging: true
        })


    }

    async validate(payload: any) {
        return { id: payload.sub, personalUsername: payload.username }
    }
}