import { observable, action } from 'mobx';
import * as postApi from 'lib/api/post';

class postListStore {
    @observable token = null;
    @observable postList = [];
    @observable page = 1;
    @observable state = "pending";

  constructor() {
      this.token = localStorage['dotia-token'];
  }

  @action.bound
  Login = () => {
    this.token = localStorage['dotia-token'];
    this.getList();
  }

  @action.bound
  getList = () => {
    this.state = "pending";
    this.page = 1;
    postApi.list({token: this.token, page: this.page})
    .then((result) => {
      //console.log('list불러오기 성공');
      this.postList = result.data;
      this.state = "done";
      //console.log(this.state.data)
    })
    .catch((result) => {
      console.log('list store err');
      console.log(result);
    });
  }

  @action.bound
  loadMore = () => {
    this.state = "pending";
    this.page = this.page + 1;
    postApi.list({token: this.token, page: this.page})
    .then((result) => {
        //console.log('list불러오기 성공');
        this.postList = this.postList.concat(result.data);
        this.state = "done";
        //console.log(this.state.data)
    })
    .catch((result) => {
        console.log('list store err');
        console.log(result);
    });
  }

@action.bound
loadMoreUserPost = ({username}) => {
  this.state = "pending";
  this.page = this.page + 1;
  postApi.userPostList({token: this.token, username:username, page: this.page})
  .then((result) => {
      //console.log('list불러오기 성공');
      this.postList = this.postList.concat(result.data);
      this.state = "done";
      //console.log(this.state.data)
  })
  .catch((result) => {
      console.log('list store err');
      console.log(result);
  });
}

@action.bound
loadMoreHeartPost = ({username}) => {
  this.state = "pending";
  this.page = this.page + 1;
  postApi.heartPostList({token: this.token, username:username, page: this.page})
  .then((result) => {
      //console.log('list불러오기 성공');
      this.postList = this.postList.concat(result.data);
      this.state = "done";
      //console.log(this.state.data)
  })
  .catch((result) => {
      console.log('list store err');
      console.log(result);
  });
}

@action.bound
loadMoreStarPost = ({username}) => {
  this.state = "pending";
  this.page = this.page + 1;
  postApi.starPostList({token: this.token, username:username, page: this.page})
  .then((result) => {
      //console.log('list불러오기 성공');
      this.postList = this.postList.concat(result.data);
      this.state = "done";
      //console.log(this.state.data)
  })
  .catch((result) => {
      console.log('list store err');
      console.log(result);
  });
}

  @action.bound
  getUserPostList = ({username}) => {
    this.state = "pending";
    this.page = 1;
    postApi.userPostList({token: this.token, username:username ,page: this.page})
    .then((result) => {
      this.postList = result.data;
      this.state = "done";
    })
    .catch((result) => {
      console.log('list store err');
      console.log(result);
    });
  }

  @action.bound
  getHeartPostList = ({username}) => {
    this.state = "pending";
    this.page = 1;
    postApi.heartPostList({token: this.token, username:username ,page: this.page})
    .then((result) => {
      this.postList = result.data;
      this.state = "done";
    })
    .catch((result) => {
      console.log('list store err');
      console.log(result);
    });
  }

  @action.bound
  getStarPostList = ({username}) => {
    this.state = "pending";
    this.page = 1;
    postApi.starPostList({token: this.token, username:username ,page: this.page})
    .then((result) => {
      this.postList = result.data;
      this.state = "done";
    })
    .catch((result) => {
      console.log('list store err');
      console.log(result);
    });
  }

  @action.bound
  deleteList = () => {
    this.postList = [];
  }

  @action.bound
  getPost = ({ index }) => {
    return this.postList[index];
  }

  @action.bound
  heart = ({ index }) => {
      this.postList[index].hearted = true;
      this.postList[index].hearts += 1;
  }


  @action.bound
  unheart = ({ index }) => {
      this.postList[index].hearted = false;
      this.postList[index].hearts -= 1;
  }


  @action.bound
  star = ({ index }) => {
      this.postList[index].stared = true;
      this.postList[index].stars += 1;
  }

  @action.bound
  unstar = ({ index }) => {
      this.postList[index].stared = false;
      this.postList[index].stars -= 1;
  }
}

export default postListStore