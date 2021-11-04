import { FollowListDTO } from 'src/dtos/FollowListDTO';
import { MockFollowCard } from './MockFollowCard';

export class MockFollowList extends FollowListDTO {
  super() {
    this.followers.push(new MockFollowCard());
    this.followings.push(new MockFollowCard());
  }
  fullname: string = 'mockFullname';
  username: string = 'mockUsername';
  followers: Array<MockFollowCard>;
  followings: Array<MockFollowCard>;
}
