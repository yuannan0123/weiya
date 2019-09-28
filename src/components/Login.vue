<template>
  <div>
    <div v-show="panelShow" class="popup">
      <div class="bg">
        <div class="card">
          <span class="close" @click="hidePanel">×</span>
          <div><img src="../../static/images/ucenter_logo.png" alt="" /></div>
          <van-tabs>
            <van-tab title="登录">
              <van-cell-group>
                <div class="hello">
                  <input
                    v-validate="'required|mobile'"
                    :class="{ input: true, 'is-danger': errors.has('mobile') }"
                    name="mobile"
                    type="text"
                    placeholder="请输入用户名"
                    v-model="postData.mobile_phone"
                  />
                  <span v-show="errors.has('mobile')" class="help danger">{{
                    errors.first("mobile")
                  }}</span>
                </div>

                <div class="hello">
                  <input
                    v-validate="'required|password'"
                    :class="{
                      input: true,
                      'is-danger': errors.has('password')
                    }"
                    name="password"
                    type="password"
                    placeholder="请输入6位密码"
                    v-model="postData.password"
                  />
                  <span v-show="errors.has('password')" class="help danger">{{
                    errors.first("password")
                  }}</span>
                </div>
              </van-cell-group>
              <van-button class="btn" @click="login" type="info"
                >登录</van-button
              >
            </van-tab>
            <van-tab title="注册/重置密码">
              <van-cell-group>
                <div class="hello">
                  <input
                    v-validate="'required|mobile2'"
                    :class="{ input: true, 'is-danger': errors.has('mobile2') }"
                    name="mobile2"
                    type="text"
                    placeholder="请输入用户名"
                    v-model="postData2.mobile_phone"
                  />
                  <span v-show="errors.has('mobile2')" class="help danger">{{
                    errors.first("mobile2")
                  }}</span>
                </div>

                <div class="code hello">
                  <div>
                    <input
                      v-validate="'required|code'"
                      :class="{ input: true, 'is-danger': errors.has('code') }"
                      name="code"
                      type="text"
                      placeholder="请输入4位验证码"
                      v-model="postData2.captcha"
                    />
                  </div>
                  <div @click="sendSms">获取验证码</div>
                </div>
                <span v-show="errors.has('code')" class="help danger">{{
                  errors.first("code")
                }}</span>

                <div class="hello">
                  <input
                    type="password"
                    v-validate="'required|password2'"
                    :class="{
                      input: true,
                      'is-danger': errors.has('password2')
                    }"
                    name="password2"
                    placeholder="请输入6位密码"
                    v-model="postData2.password"
                  />
                  <span v-show="errors.has('password2')" class="help danger">{{
                    errors.first("password2")
                  }}</span>
                </div>
              </van-cell-group>
              <van-button class="btn" type="info" @click="register"
                >注册</van-button
              >
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginHandle, sendSmsHandle, logoutHandle, registerHandle } from '@/api/user'
export default {
  props: {
    panelShow: {
      type: Boolean
    }
  },
  data () {
    return {
      show: true,
      postData: {
        mobile_phone: '',
        password: ''
      },
      postData2: {
        mobile_phone: '',
        password: '',
        captcha: ''
      }
    }
  },
  methods: {
    hidePanel () {
      this.$emit('update:panelShow', false)
    },
    // 登录
    login () {
      var loginParams = {
        mobile_phone: this.postData.mobile_phone,
        password: this.postData.password
      }
      // console.log(loginParams)
      // console.log(this.postData.mobile_phone, this.postData.password)
      // loginHandle(this.postData)
      //   .then(r => console.log(r)) // 接口调用成功返回的数据
      //   .catch(err => console.log(err)) // 接口调用失败返回的数据
      loginHandle(loginParams).then(res => {
        console.log(res.data, '登录的数据')
        console.log(res.data.data.token)

        if (res.data.code === '1') {
          // 存储token值
          localStorage.setItem('mytoken', res.data.data.token)
          localStorage.setItem('mobile_phone', res.data.data.user.mobile_phone)
          localStorage.setItem('status', 'true')
          localStorage.setItem('name', res.data.data.user.name)
          // 登录成功跳转
          setTimeout(() => {
            this.$router.go(0)
          }, 1000)
        }
      })
    },
    // 验证码
    sendSms () {
      var sendSmsParams = {
        mobile_phone: this.postData2.mobile_phone
      }
      sendSmsHandle(sendSmsParams).then(res => {
        console.log(res.data)
      })
      console.log(this.postData2)
    },
    onClickLeft () {
      this.$router.go(0)
    },
    onClickRight () {
      console.log('确定')
    },
    // 用户注册，修改密码
    register () {
      var registerParams = {
        mobile_phone: this.postData2.mobile_phone,
        password: this.postData2.password,
        captcha: this.postData2.captcha
      }
      registerHandle(registerParams).then(res => {
        console.log(this.postData2.captcha)
        console.log(res.data)
        if (res.data.code === '1') {
          // 存储token值
          localStorage.setItem('mytoken', res.data.data.token)
          localStorage.setItem('status', 'true')
          localStorage.setItem('mobile_phone', res.data.data.user.mobile_phone)
          console.log(res.data)
          this.$router.go(0)
        }
      })
    },
    // 退出登录
    logout () {
      logoutHandle().then(res => {
        console.log(res.data)
        if (res.data.code === '1') {
          // 清除本地用户信息
          localStorage.clear()
          // 跳到登录页
          setTimeout(() => {
            // 刷新当前页面
            this.$router.go(0)
          }, 300)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .bg {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
    position: fixed;
    .card {
      width: 92%;
      margin: 40% auto;
      background: #fff;
      position: relative;
      border-radius: 8px;
    }
  }
  .close {
    font-size: 30px;
    position: absolute;
    right: 6px;
    top: 6px;
  }

  .card {
    width: 92%;
    border-radius: 10px;
    padding: 5% 0;

    div {
      text-align: center;
      img {
        margin-top: 20px;
      }
    }
  }

  .btn {
    width: 92%;
    margin-bottom: 5%;
    margin-top: 10px;
    background-color: #ff7bac;
    border: 1px solid #ff7bac;
    border-radius: 5px;
  }
  .code {
    display: flex;
    align-items: center;
    div:nth-of-type(1) {
      flex: 8;
    }
    div:nth-of-type(2) {
      flex: 3;
      background: #ff7bac;
      margin-left: 10px;
      height: 40px;
      line-height: 40px;
      border-radius: 3px;
      color: #fff;
    }
  }
  .van-field {
    padding-bottom: 0;
  }
  .msy {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 50px;
    color: #999;
  }
  .aa {
    background: red;
  }
  .danger {
    color: red;
    text-align: left;
    display: block;
  }
  .hello {
    width: 92%;
    margin: 10px auto;
  }
</style>
