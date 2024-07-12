import { Args, Context, GraphQLExecutionContext, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input.dto';
import { Res, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { LoginStatus } from './dto/login-status.dto';
import { LogoutStatus } from './dto/logout-status.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtRefreshGuard } from './jwt-refresh.guard';
import { RefreshStatus } from './dto/refresh-status-dto';
import { RefreshInput } from './dto/refresh-input.dto';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) { }


    @Mutation(() => LoginStatus)
    @UseGuards(GqlAuthGuard)
    login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context) {

        return this.authService.login(context.user, context.res);

    }

    @Mutation(() => LogoutStatus)
    @UseGuards(JwtAuthGuard)
    logout(@Context() context) {

        return this.authService.logout(context.res);


    }

    @Mutation(() => RefreshStatus)
    @UseGuards(JwtRefreshGuard)
    regen(@Args('refreshInput') refreshInput: RefreshInput, @Context() context) {
        return this.authService.regen(refreshInput, context.res)
    }


}
