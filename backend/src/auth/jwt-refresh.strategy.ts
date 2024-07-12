// import { ExtractJwt, Strategy } from "passport-jwt";
// import { PassportStrategy } from "@nestjs/passport";
// import { Injectable } from "@nestjs/common";

// @Injectable()
// export class JwtRefreshStrategy extends PassportStrategy(Strategy){
//     constructor(){
//         super({  // config for strategy
//             // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // get the token from auth header... which we gotta provide in the reqs from client side..
//             // jwtFromRequest: ExtractJwt.('Authentication'),  

//             jwtFromRequest: ExtractJwt.fromExtractors([
//                 (request: any) => {
//                   //console.log(request)
//                   return request?.cookies?.Refresh;
//                 },
//               ]),
//             ignoreExpiration: false, // if tokem is expired, ignore it..
//             secretOrKey: process.env.JWT_SECRET, // same secret as the one we use when generating the tokens...
//             logging:true
//         })
            
        
//     }

//     async validate(payload:any){  // payload is the decoded jwt..

     
//         return {id:payload.sub,password:payload.password}
//     }
// }