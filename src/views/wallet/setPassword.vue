<template>
  <div>
    <van-nav-bar
      title="设置钱包账户安全密码"
      left-text=""
      right-text="确定"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="content">
      <div>
        *钱包账户包括采购账户和收益账户，用户设置钱包账户安全密码后进入查看账户和进行账户支付或提现操作时需要密码验证。
      </div>
      <div class="code">
        <div>
          <input
            name="code"
            v-validate="'required|code'"
            :class="{ input: true, 'is-danger': errors.has('code') }"
            type="text"
            placeholder="请输入4位验证码"
             v-model="captcha"
          />
        </div>
        <div @click="sendSms">获取手机验证码</div>
      </div>
      <van-password-input
        :value="value"
        info="密码为 6 位数字"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
      />
    </div>
  </div>
</template>

<script>
import { sendSmsHandle } from '@/api/user'
import { forgetPassword, getWalletDetailst } from '@/api/wallet'
export default {
  data () {
    return {
      value: '', // 设置的密码
      showKeyboard: true,
      mobile_phone: '',
      captcha: ''// 验证码
    }
  },
  created () {
    // 获取本地存储数据
    // this.status = localStorage.getItem('status')
    this.mobile_phone = localStorage.getItem('mobile_phone')
    this.getWalletDetailst()
  },
  methods: {
    getWalletDetailst () {
      getWalletDetailst().then(res => {
        console.log(res)
      })
    },
    onClickLeft () {
      this.$router.push({
        name: 'User'
      })
    },
    onClickRight () {
      let data = {
        mobile_phone: this.mobile_phone,
        password: this.value,
        captcha: this.captcha
      }
      forgetPassword(data).then(res => {
        console.log(res)
        if (res.data.code == 1) {
          this.$router.push({
            path: '/User'
          })
        } else {
          this.$toast(res.data.msg)
        }
      })
      console.log(this.value, this.captcha, this.mobile_phone)
    },
    // 获取输入的密码
    onInput (key) {
      this.value = (this.value + key).slice(0, 6)
    },
    // 删除密码
    onDelete () {
      this.value = this.value.slice(0, this.value.length - 1)
    },
    // 验证码
    sendSms () {
      var sendSmsParams = {
        mobile_phone: this.mobile_phone
      }
      sendSmsHandle(sendSmsParams).then(res => {
        console.log(res.data)
      })
      console.log(this.postData2)
    }
  }
}
</script>

<style lang="less" scoped>
  .content {
    padding: 20px;
    .code {
      display: flex;
      margin-top: 40px;
      align-items: center;
      div:nth-of-type(1) {
        flex: 8;
      }
      div:nth-of-type(2) {
        flex: 4;
        background: #00a0e8;
        margin-left: 10px;
        height: 40px;
        line-height: 40px;
        border-radius: 3px;
        color: #fff;
        text-align: center;
      }
    }
    .van-password-input {
      margin: 0;
      margin-top: 40px;
    }
    .van-password-input__security {
      border: 1px solid #ccc;
      border-right: none;
    }
    .van-password-input__security li {
      border-right: 1px solid #ccc;
    }
  }
</style>
