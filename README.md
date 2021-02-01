Chaihuo ASCII PHOTO
============
## 简介
ASCII码照相机，将实时图像转成ASCII字符。

### 特点
* 基于HTML5实现，只要有浏览器就可以使用
* 可将照片上传至阿里云OSS
* 配套网页端浏览储存在阿里云OSS的最新照片，网页端适自应手机
* 配套基于Arduino的简单补光灯代码。
* 不同摄像机对颜色的敏感度不同，增加了颜色参数添加的功能。
* 定时自拍功能。

### 各模块说明
* 相机端：最核心的部分，HTML5静态网页，将实时图像转成ASCII字符，保存为图片，上传到阿里云OSS。但是要注意，填写阿里云OSS的accessKeyId和accessKeySecret后不要外泄代码，存储在电脑本地用就可以了。accessKeyId和accessKeySecret被人拿到，你的阿里云OSS账户就没钱了。
* 浏览端：HTML5静态网页,修改对应的链接，上传到服务器上就可以用了。
* Arduino补光灯：发现灯光变化对效果影响很大，所以临时拿身边的器材做了一个补光灯

### 案例
柴火创客空间，用户在“照相端”拍照留念，然后扫描关注“柴火创客空间”公众号，输入关键词“照片”，返回“浏览端”链接，用户打开“浏览端”链接下载照片



## 配置指南
### 1）下载链接
[chaihuo_ascil_photo_v0.1](https://github.com/ma2b/chaihuo_ascil_photo/archive/main.zip)
### 2）阿里云配置
我们需要来自阿里云的4样东西
```
region: '',
accessKeyId: '',
accessKeySecret: '',
bucket: ''
```
1. 如果没有注册阿里云，先注册阿里云。
2. 注册好阿里云后，点击头像，选择AccessKey管理，创建accessKey。**然后你就可以获取到accessKeyId和accessKeySecret**。
3. 然后在阿里云控制台打开“对象储存OSS”，新用户应该有相关的优惠。
4. 点击"创建Bucket",有几个选项需要注意：
```
储存类型：标准
同城冗余储存：关闭
版本控制：不开通
读写权限：公共读
服务端加密方式：无
实时日志查询：不开通
定时备份：不开通
```
然后点击确认
**现在，你得到了"bucket"这个参数，就是这个bucket的名称。**
**而"region"如何快速查看呢？如果Bucket概览页面里的外网访问的Endpoint是oss-cn-shenzhen.aliyuncs.com，那么去掉后面的".aliyuncs.com"就是oss-cn-shenzhen**
（这应该不是正确查找这个参数的方式，但对我来说很方便，不行发邮件跟我说下）
5. 新建好Bucket，还没结束，还要进行跨域的设置，点击“权限管理”->"跨域访问"->"创建规则"，进行如下设置
```
来源: *
允许 Methods: GET POST PUT DELETE HEAD (即全选)
允许 Headers: *
暴露 Headers: ETag
缓存时间（秒）: 0
返回 Vary: Origin : 不勾选！
```
6. 现在，在文件夹camera/script找到app.js文件，把上面4个参数填入。

### 3）开启相机端
现在，你可以打开文件夹里的index.html，就可以开启相机端了，点击“定时拍照”，拍好后，照片就到阿里云OSS中。
你可以在阿里云“Bucket”文件管理的页面中找到最新上传的照片。
点击对应照片的“详情”，就可以看到对应的照片链接URL,点击“复制文件URL”，比如我的是"https://chimg.oss-cn-shenzhen.aliyuncs.com/lastphoto9.png"

### 4) 配置浏览端
进入文件夹photo,编辑index.html文件。把里面对应的lastphoto1~9的链接全部换成你自己的图片链接，
如果我的是"https://chimg.oss-cn-shenzhen.aliyuncs.com/lastphoto9.png",你把它改成你刚刚找到名为lastphoto9的照片。

### 5）修改二维码和对应的文字
上传后提示：在app.js找到“上传成功。关注公众号“柴火创客空间”，输入关键词“照片”, 对应照片编号为”修改“柴火创客”为你的公众号资料。
二维码：更换文件夹image里的"qrcode"

### 6) 测试效果
测试好效果前，没有必要上传到互联网。后面会详细介绍几个调试效果的方法

### 7）上传服务器
测试好效果后上传到开放的服务器上，可以在互联网浏览到你的相关照片

### 8) 设置你的公众号
找到自动回复，设置关键词“照片”的自动回复为浏览端的URL

## 调试效果
### app.js相关调试
在camera/app.js搜索"#调试点1"，调整整体大小、镜像和FPS

### css相关调试
当我在电脑端调试好后，发现在树莓派上的样式发生了不少变化。
特别是字符间隙，估计是字体的字体问题，反正我们在css/main.css找到"#调试点2"，
设置一下“letter-spacing”，找到合适的参数。我的电脑端是-1.5px，树莓派是-0.5px;

### RGB调试
不同摄像机对颜色的敏感度不同，所以我增加了颜色参数添加的功能。
你可以直接拖动页面上关于R, G, B的滑动条，也可以使用对应的快捷键
R: R+/T- 意思是按键R增加数值，按键T减少数值
G: G+/H- ...
B: B+/N- ...

### 物理调节 Arduino补光灯
在实际调节中，发现光线影响还是太严重了，所以临时拿身边的器材做了一个补光灯。
相关材料
* Arduino
* ws2812灯带
* 旋钮
对应文件名为analogLight


## 树莓派配置
如果把“相机端”放在树莓派中使用，还需要一些设置
### 打开Camera功能
在树莓派系统的开始菜单点击Preferences->Raspberry Pi Configuration->Interfaces->Camera,选择Enable

### 排线摄像头
如果你使用的是排线摄像头，需要在终端输入以下命令
```
sudo sed -i -e "\$asnd-bcm2835" /etc/modules
sudo sed -i -e "\$abcm2835-v4l2" /etc/modules
echo "options bcm2835-v4l2 gst_v4l2src_is_broken=1" | sudo tee /etc/modprobe.d/bcm2835-v4l2.conf
```
参考：[enable the camera module on chromium browser](https://www.raspberrypi.org/forums/viewtopic.php?t=220261)

### USB摄像头
没试过，试过的同学可以告诉我。


## 支持的浏览器
* Chrome &ge; 21
* Firefox &ge; 17 (requires `media.navigator.enabled = true` in `about:config`)
* Opera &ge; 12

## 鸣谢
* 核心代码参考[idevelop](https://github.com/idevelop/ascii-camera)

## License
- This code is licensed under the MIT License.

