<template>
  <div class="main">
    <div class="btn">
      <div class="btn_one"></div>
      <div class="btn_two"></div>
      <div class="btn_three"></div>
      <div class="btn_fore"></div>
    </div>
    <div class="decor decor_one"></div>
    <div class="decor decor_two"></div>
    <div class="decor decor_three"></div>
    <div class="decor decor_fore"></div>
    <div class="decor decor_five"></div>
    <div class="decor decor_six"></div>
    <div class="frame_one">
      <div class="frame_two">
        <div class="receiver"></div>
        <div class="frame_three">
          <div class="time">12:00</div>
          <div class="signals">
            <div class="signal_one signal"></div>
            <div class="signal_two signal"></div>
            <div class="signal_three signal"></div>
            <div class="signal_fore signal"></div>
          </div>
          <div class="electric_quantity">
            <div class="electric_quantity_content"></div>
            <div class="battery_head"></div>
          </div>
          <div class="bangs">
            <div class="bangs_top">
              <div class="left_corner"></div>
              <div class="right_corner"></div>
              <div class="camera">
                <div class="camera_one">
                  <div class="camera_two"></div>
                </div>
              </div>
            </div>
            <div class="title">自定义流程</div>
          </div>

          <div class="content">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.main {
  position: relative;
  width: 430px;
  height: 883px;
  margin: auto;
  border-radius: 65px;
  background: linear-gradient(
    180deg,
    #333d47 -3%,
    #333d47 -3%,
    #4d6276 100%,
    #4d6276 100%
  );

  .decor {
    width: 6px;
    height: 15px;
    background: #7e818a;
    position: absolute;
  }

  .decor_one {
    top: 0;
    right: 87px;
  }

  .decor_two {
    top: 119px;
    left: 0px;
  }

  .decor_three {
    top: 119px;
    right: 0px;
  }

  .decor_fore {
    bottom: 123px;
    right: 0px;
  }

  .decor_five {
    bottom: 123px;
    left: 0px;
  }

  .decor_six {
    width: 15px;
    height: 15px;
    bottom: 0px;
    left: 93px;
  }

  .btn {
    width: 436px;
    height: 204px;
    background: #fff;
    position: absolute;
    top: 148px;
    left: -3px;
    z-index: -1;
    box-sizing: content-box;

    .btn_one {
      width: 6px;
      height: 33px;
      background: #000;
      position: absolute;
      left: 0px;
      border-radius: 10px;
    }

    .btn_two {
      width: 6px;
      height: 72px;
      background: #121515;
      position: absolute;
      left: 0px;
      top: 80px;
      border-radius: 10px;
    }

    .btn_three {
      width: 6px;
      height: 72px;
      background: #121515;
      position: absolute;
      left: 0px;
      top: 185px;
      border-radius: 10px;
    }

    .btn_fore {
      width: 6px;
      height: 112px;
      background: #121515;
      position: absolute;
      right: 0px;
      top: 110px;
      border-radius: 10px;
    }
  }

  .frame_one {
    width: 430px;
    height: 883px;
    border-radius: 65px;
    background: #3a4245;

    .frame_two {
      width: 418px;
      height: 871px;
      background: #121515;
      border-radius: 65px;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;

      .receiver {
        width: 55px;
        height: 8px;
        border-radius: 60px;
        background: #262c2d;
        margin: 2.7px auto 0 auto;
      }

      .frame_three {
        width: 390px;
        height: 844px;
        border-radius: 42px;
        // background: linear-gradient(180deg, #333D47 -3%, #333D47 -3%, #4D6276 100%, #4D6276 100%);
        background: rgb(245, 246, 248);
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        .time {
          font-size: 18px;
          position: absolute;
          left: 35px;
          top: 13px;
          color: #fff;
          font-weight: 600;
        }
        .signals {
          position: absolute;
          right: 65px;
          top: 13px;
          .signal {
            width: 4px;
            margin-right: 2px;
            float: left;
            position: relative;
            border-radius: 10px;
            background: #fff;
          }
          .signal_one {
            height: 8px;
            top: 8px;
          }
          .signal_two {
            height: 12px;
            top: 4px;
          }
          .signal_three {
            height: 14px;
            top: 2px;
          }
          .signal_fore {
            height: 16px;
          }
        }
        .electric_quantity {
          width: 28px;
          height: 16px;
          position: absolute;
          right: 30px;
          top: 13px;
          border-radius: 3px;
          background: rgb(228, 228, 228);
          .electric_quantity_content {
            width: 24px;
            height: 12px;
            background: #fff;
            border: 1px solid rgb(233, 64, 87);
            margin: auto;
            border-radius: 3px;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            z-index: 5;
          }
          .battery_head {
            width: 5px;
            height: 6px;
            position: absolute;
            // left: 0;
            right: -2px;
            top: 0;
            bottom: 0;
            margin: auto;
            z-index: 3;
            background: #fff;
            border-radius: 1px;
          }
        }
        .bangs {
          height: 86px;
          background: #e94057;
          border-top-left-radius: 40px;
          border-top-right-radius: 40px;
          .bangs_top {
            width: 154.42px;
            height: 32px;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
            background: #121515;
            margin: auto;
            position: relative;
            z-index: 10;
            .left_corner {
              width: 15px;
              height: 18px;
              border-radius: 40px;
              background: #121515;
              position: absolute;
              left: -2px;
              top: -12px;
            }
            .right_corner {
              width: 15px;
              height: 18px;
              border-radius: 40px;
              background: #121515;
              position: absolute;
              right: -2px;
              top: -12px;
            }
            .camera {
              width: 16px;
              height: 16px;
              background: #262c2d;
              border-radius: 50px;
              position: absolute;
              left: 10px;
              top: 0;
              bottom: 0;
              margin: auto;

              .camera_one {
                width: 10px;
                height: 10px;
                background: #121515;
                border-radius: 50px;
                margin: 3px 0px 0 3px;

                .camera_two {
                  width: 2px;
                  height: 2px;
                  opacity: 0.4;
                  background: #636f73;
                  position: absolute;
                  left: 0px;
                  right: 0;
                  top: 0;
                  bottom: 0;
                  margin: auto;
                }
              }
            }
          }
          .title {
              padding-top: 15px;
              font-size: 20px;
              font-weight: 500;
              color: #fff;
          }
        }
        .content {
          width: 100%;
          height: 708px;
          padding: 12px;
          overflow: hidden;
          overflow-y: auto;
          .element {
            -ms-overflow-style: none;
          }
          box-sizing: border-box;
        }
        .content::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }
}
</style>