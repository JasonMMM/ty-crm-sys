<template>
  <div class="login-container">
    <img class="login-bg-img" src="@/assets/images/login/blur/morning_blur.jpg" alt="">
    <el-row class="login-container-row">
      <el-col :sm="10" :offset="6" class="hidden-sm-and-down">
        <!-- 左边的图 -->
        <div class="login-left-col">
          <div class="login-left-col-title">
            <p class="title-line1">早安 Good Morning</p>
            <p class="title-line2">现在是2020年07月24日 8点23分 星期五</p>
            <p class="title-line3">美好的一天从现在开始</p>
          </div>
          <img class="login-left-col-bg-img" src="@/assets/images/login/morning.png" alt="">
        </div>
      </el-col>
      <el-col :sm="{span: 4, pull: 2}" :xs="{span: 20, offset: 2}" class="login-right-col">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
          label-position="left"
          size="mini"
        >
          <el-col :sm="{span: 18, offset:3}">
            <!-- <div class="title-logo">
              <img src="@/assets/images/tianyi_logo_png.png" alt="">
            </div> -->
            <div class="title-container">
              <h3 class="title">{{ $t('login.title') }}</h3>
              <lang-select class="set-language" />
            </div>
            <el-form-item prop="username">
              <el-input
                ref="username"
                v-model="loginForm.username"
                :placeholder="$t('login.username')"
                name="username"
                type="text"
                autocomplete="on"
              >
                <template slot="prepend">
                  <svg-icon icon-class="user" />
                </template>
              </el-input>
            </el-form-item>

            <el-tooltip v-model="capsTooltip" content="大写已打开" placement="right" manual>
              <el-form-item prop="password">
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  :placeholder="$t('login.password')"
                  name="password"
                  tabindex="2"
                  autocomplete="on"
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                  @keyup.enter.native="handleLogin"
                >
                  <template slot="prepend">
                    <svg-icon icon-class="password" />
                  </template>
                </el-input>
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
              </el-form-item>
            </el-tooltip>

            <el-button
              :loading="loading"
              size="mini"
              type="primary"
              style="width:100%;margin-bottom:30px;"
              @click.native.prevent="handleLogin"
            >{{ $t('login.logIn') }}
            </el-button>
          </el-col>
        </el-form>
        <p class="banquan">版权所有：天亿软件技术团队</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import LangSelect from "@/components/LangSelect";
import SocialSign from "./components/SocialSignin";

export default {
  name: "Login",
  components: { LangSelect, SocialSign },
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "111111",
      },
      loginRules: {
        username: [
          { required: true, trigger: "change", message: "请输入用户名"},
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入密码"},
        ],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery,
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$dark_gray: #000000;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    input {
      color: $dark_gray;
      caret-color: $dark_gray;
    }
  }
  .login-bg-img {
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>

<style lang="scss" scoped>
$bg: #ffffff;
$dark_gray: #000000;
$light_gray: #ffffff;
$row_bg: #000000;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-container-row {
    height: 100%;
    position: relative;
    top: 0px;
    bottom: 0px;
    width: 100%;
    z-index: 999;
    margin-top: 8rem;
  }
  .login-left-col {
    height: 440px;
    box-shadow: 0px 8px 20px 0px black;
    border-radius: 10px;

    .login-left-col-title {
      position: absolute;
      margin-left: 20px;

      .title-line1 {
        color: #ffffff;
        font-size: 30px;
        line-height: 10px;
        font-weight: bold;
      }
      .title-line2 {
        color: #fedc6e;
        font-size: 16px;
        line-height: 10px;
        font-weight: bold;
      }
    }

    .login-left-col-bg-img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }
  .login-right-col {
      margin-top: 60px;
      height: 300px;
      background-color: #000000c9;
      border-radius: 10px;
  }

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    // padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .title-logo {
      img{
        width: 200px;
      }
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 16px;
      color: #ffffff;
      margin: 40px 0 30px 0;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #1890ff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 2px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  .banquan {
    text-align: center; 
    color: #a4a4a4;
    font-size: 0.1rem;
    
  }
  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
