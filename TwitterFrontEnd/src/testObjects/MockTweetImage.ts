import { TweetImageDTO } from 'src/dtos/TweetImageDTO';

export class MockTweetImage extends TweetImageDTO {
  id: string = 'mockTweetImageID';
  imagePath: string = 'mockTweetImagePath';
}
