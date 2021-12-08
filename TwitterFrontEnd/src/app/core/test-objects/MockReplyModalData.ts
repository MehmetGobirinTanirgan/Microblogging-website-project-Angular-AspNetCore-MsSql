export class MockReplyModalData {
  super() {
    this.mainTweetCreatedDate = new Date();
  }
  mainTweetID: string = 'mockTweetID';
  mainTweetUserProfilePicPath: string = 'mockTweetUserProfilePicPath';
  mainTweetFullname: string = 'mockFullname';
  mainTweetUsername: string = 'mockUsername';
  mainTweetCreatedDate: Date;
  mainTweetDetail: string = 'mockTweetDetail';
  mainTweetImagePaths: Array<string> = ['mockPath1', 'mockPath2'];
  replyTweetUserProfilePicPath: string = 'mockProfilePicPath';
  username: string = 'mockUsername';
}
