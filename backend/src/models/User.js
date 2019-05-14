import mongoose from "mongoose";
import crypto from "crypto";

// JWT 토큰생성 함수
import { generateToken } from "jwt/jwt_token";

const hash = password => {
  return crypto
    .createHmac("sha256", process.env.SECRET_KEY)
    .update(password)
    .digest("hex");
};

const User = new mongoose.Schema({
  profile: {
    username: String,
    Introduction: String,
    thumbnail: { type: String, default: "testimg/bonobono.png" },
    hearts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
    stars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    follower: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  email: String,
  social: {
    facebook: {
      id: String,
      accessToken: String
    },
    twitter: {
      id: String,
      accessToken: String
    },
    google: {
      id: String,
      accessToken: String
    }
  },
  password: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

User.statics.findByUsername = function(username) {
  // 객체에 내장되어있는 값을 사용 할 때는 객체명.키 이런식으로 쿼리하면 됩니다
  return this.findOne({ "profile.username": username }).exec();
};

User.statics.findByEmail = function(email) {
  return this.findOne({ email }).exec();
};

User.statics.findByEmailOrUsername = function({ username, email }) {
  return this.findOne({
    // $or 연산자를 통해 둘중에 하나를 만족하는 데이터를 찾습니다
    $or: [{ "profile.username": username }, { email }]
  }).exec();
};

// 사용자 등록 메소드
User.statics.localRegister = function({ username, email, password }) {
  // 데이터를 생성 할 때는 new this() 를 사용합니다.
  const account = new this({
    profile: {
      username
      // thumbnail 값을 설정하지 않으면 기본값으로 설정됩니다.
    },
    email,
    password: hash(password)
  });
  return account.save();
};

// 비밀번호 비교 메소드
User.methods.validatePassword = function(password) {
  const contrast = hash(password);
  return this.password === contrast;
};

// jwt payload로 토큰 발행
User.methods.generateToken = function() {
  const payload = {
    _id: this._id,
    profile: this.profile
  };
  return generateToken(payload, "User");
};

export default mongoose.model("User", User);
