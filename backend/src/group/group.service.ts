import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateGroupInput } from './dto/create-group.input.dto';
import { UpdateGroupInput } from './dto/update-group.input.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Groups } from './entities/groups.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid'
import { UserService } from '../user/user.service';
import { User } from 'src/user/entities/user.entity';
import { GroupTransactionService } from 'src/group-transaction/group-transaction.service';


@Injectable()
export class GroupService {
    constructor(@InjectRepository(Groups) private groupRepository: Repository<Groups>, @Inject(forwardRef(() => UserService)) private userService: UserService, private groupTransactionService: GroupTransactionService) { }

    async create(createGroupInput: CreateGroupInput) {


        if (createGroupInput.groupName) {


            const newMember = this.groupRepository.create(createGroupInput);

            if (createGroupInput.groupName) {
                newMember.groupID = uuidv4();
            } else {

                const group = await this.groupRepository.findOneBy({ groupID: createGroupInput.groupID })
                newMember.groupName = group.groupName;

            }

            newMember.alive = true
            return this.groupRepository.save(newMember);

        } else {

            const already = await this.groupRepository.findOneBy({ memberId: createGroupInput.memberId, groupID: createGroupInput.groupID })

            if (already) {

                already.alive = true;
                return this.groupRepository.save(already)

            } else {

                const newMember = this.groupRepository.create(createGroupInput);

                if (createGroupInput.groupName) {
                    newMember.groupID = uuidv4();
                } else {

                    const group = await this.groupRepository.findOneBy({ groupID: createGroupInput.groupID })
                    newMember.groupName = group.groupName;

                }

                newMember.alive = true
                return this.groupRepository.save(newMember);

            }

        }

    }


    getGroupData(id: string) {
        return this.groupRepository.findBy({ groupID: id })
    }

    findMembers(id: string) {
        return this.groupRepository.findBy({ groupID: id });
    }

    findDets(id: string) { }


    findMany(mid: string) {
        return this.groupRepository.findBy({ memberId: mid });
    }

    findmuch(gid: string) {
        return this.groupRepository.findBy({ groupID: gid })
    }


    async update(id: string, updateGroupInput: UpdateGroupInput) {

        if (updateGroupInput.groupName) {

            await this.groupRepository.update({ groupID: id }, { groupName: updateGroupInput.groupName })
            const group = await this.groupRepository.findOneBy({ groupID: id })
            return this.groupRepository.save(group);

        } else if (updateGroupInput.memberName) {

            const group = await this.groupRepository.findBy({ groupID: id })


            group.forEach((each) => {
                if (each.memberId === updateGroupInput.memberId) {
                    each.memberName = updateGroupInput.memberName;
                    this.groupRepository.save(each);
                }
            })


            const upGroup = await this.groupRepository.findOneBy({ groupID: id })
            return this.groupRepository.save(upGroup);


        } else {


            const groupentry = await this.groupRepository.findOneBy({ groupID: id, memberId: updateGroupInput.memberId });
            groupentry.alive = false;
            await this.groupRepository.save(groupentry);



            try {

                const aliveentry = await this.groupRepository.findOneByOrFail({ groupID: id, alive: true });
                return this.groupRepository.save(aliveentry);

            } catch (err) {

                this.groupTransactionService.deleteAllGroupTrans(id)
                this.groupRepository.delete({ groupID: id })
                return groupentry

            }



        }

    }



    async findAllGroupAccDel(id: string) {

        const allentries = await this.findMany(id)

        allentries.forEach((each) => {

            const dto = {
                groupID: each.groupID,
                memberId: id
            }

            this.update(each.groupID, dto)
        })

    }



    // relationshipss

    async getUsers(gid: string): Promise<User[]> {

        const allmembs = await this.groupRepository.findBy({ groupID: gid });

        const allpfps = allmembs.map((each) => {
            return this.userService.findOne(each.memberId)
        })

        return Promise.all(allpfps)

    }


    async getUser(mid: string): Promise<User> {

        return this.userService.findOne(mid)

    }

}




