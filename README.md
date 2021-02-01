Chaihuo ASCII PHOTO
============    
## 简介

ASCII码照相机，将实时图像转成ASCII字符。照片可上传至云端，通过微信公众号下载照片。

适合部署在创客空间、科技类公司，引导访客关注公司的微信公众号。

### 柴火创客空间案例：

访客在屏幕前拍照留念，然后扫描关注“柴火创客空间”公众号，输入关键词“照片”，公众号会返回照片链接，用户打开链接下载照片

### 各模块说明

相机端：具备拍摄和上传功能。将实时图像转成ASCII字符，保存为图片，上传到阿里云OSS。

![图片](https://uploader.shimo.im/f/CyKqMIKI6jZZ7dKz.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

拍照效果

浏览端：用来显示上传的照片，访客通过公众号获取链接，手机内下载对应照片

![图片](https://uploader.shimo.im/f/PyKVV5hFEp00KOex.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

![图片](https://uploader.shimo.im/f/BEALFQTeD4dBKive.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

微信公众号下载拍照的图片

Arduino补光灯（可选）：发现灯光变化对效果影响很大，所以临时拿身边的器材做了一个补光灯，对效果的影响非常明显。

![图片](https://uploader.shimo.im/f/7oKRDAtl8g7eDmGX.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

夜间效果 - 未使用补光灯效果

![图片](https://uploader.shimo.im/f/gvGQMQ6p6yxsbmLl.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

夜间效果 - 使用补光灯效果

### 特点

* 基于HTML5实现，只要有浏览器就可以使用。
* 可将照片上传至阿里云OSS
* 配套网页端浏览储存在阿里云OSS的最新照片，网页端适自应手机
* 配套基于Arduino的简单补光灯代码。
* 不同摄像机对颜色的敏感度不同，增加了颜色参数添加的功能。
* 定时自拍功能。
* 可以修改显示的ASCII
* 修改字体和背景的颜色
### 准备

* 树莓派4B控制板
* 摄像头（本项目用的是Raspberry Pi Camera v2）
* 代码编辑器（比如VS Code）
* Arduino UNO控制板（可选）
* WS2812 灯带（可选）
* 模拟量旋钮（可选）
## 配置指南

### 1）下载链接

[chaihuo_ascil_photo_v0.2](https://github.com/ma2b/chaihuo_ascii_photo/archive/main.zip)

### 2）阿里云配置

我们需要来自阿里云的4样东西

```plain
region: '',
accessKeyId: '',
accessKeySecret: '',
bucket: ''
```
2.1）如果没有注册阿里云，先注册阿里云。
登陆[aliyun.com](https://www.aliyun.com/)

右上角选择登陆或者注册

![图片](https://uploader.shimo.im/f/fCczzVpVlHgVvcNk.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)



2.2）获得参数"accessKeyId"和"accessKeySecret"

点击右角“控制台”，进入到“控制台”

![图片](https://uploader.shimo.im/f/XatVzUJXDMl0zRQI.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

点击右上角头像，弹出菜单后点击“AccessKey管理”

![图片](https://uploader.shimo.im/f/2s74OkZoeyc1U94G.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)


进入到AccessKey管理页面，点击"创建accessKey"

![图片](https://uploader.shimo.im/f/Eju5oY1y37bMjJGG.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

然后你就可以获取到"accessKeyId"和"accessKeySecret"。

![图片](https://uploader.shimo.im/f/6iszKch08dpRcEyU.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

请记得保存下来！

2.3）开通“对象储存OSS”

在“阿里云控制台”搜索OSS对象储存"，点击进入，新用户应该有相关的优惠。

![图片](https://uploader.shimo.im/f/Lczoycicpbr3cyXu.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)


2.4）创建Bucket

“对象储存OSS”的页面中，找到右边的"创建Bucket"，进入创建Bucket的页面。

![图片](https://uploader.shimo.im/f/6scdXe81nwbBFDry.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

Bucket名称：自己取名，英文。Buckect有点像储存文件的文件夹。

地域：根据你的地域设置。

注意：红框内的选项要按下图选择

![图片](https://uploader.shimo.im/f/N1lYEnD3UjsUDxvY.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

```plain
储存类型：标准
同城冗余储存：关闭
版本控制：不开通
读写权限：公共读
服务端加密方式：无
实时日志查询：不开通
定时备份：不开通
```
然后点击确认，进入到bucket页面

2.5）获得参数"bucket"和"region"

**现在，你得到了"bucket"这个参数，就是这个bucket的名称。**

![图片](https://uploader.shimo.im/f/ZzYfa3zd9N2HSXqQ.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

**而"region"如何快速查看呢？如果Bucket概览页面里的“外网访问”的Endpoint是oss-cn-shenzhen.aliyuncs.com，那么去掉后面的".aliyuncs.com"就是oss-cn-shenzhen**

![图片](https://uploader.shimo.im/f/qjPbB60yuq1OGhsN.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)


2.6）设置跨域访问

新建好Bucket，还没结束，还要进行跨域的设置，点击“权限管理”->"跨域设置"

![图片](https://uploader.shimo.im/f/bCBcms8SJBAhxtm6.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

到达跨域设置，点击设置

![图片](https://uploader.shimo.im/f/hc0kCExgCLC3LLys.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)


点击"创建规则"，

![图片](https://uploader.shimo.im/f/FxpSjWCCnSaegDnV.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

进行如下设置，设置好点击确定。

![图片](https://uploader.shimo.im/f/0Ye28kMZJpooGStb.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)


```plain
来源: *
允许 Methods: GET POST PUT DELETE HEAD (即全选)
允许 Headers: *
暴露 Headers: ETag
缓存时间（秒）: 0
返回 Vary: Origin : 不勾选！
```

2.7）现在，在文件夹camera/script找到app.js文件，把之前找到的4个参数（bucket、region、accessKeyId、accessKeySecret）填入。

![图片](https://uploader.shimo.im/f/pESLzw6zjXf3422A.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)


注意：填写阿里云OSS的accessKeyId和accessKeySecret后，你的camera代码不要外泄代码，不要上传到云端，存储在电脑本地用就可以了。accessKeyId和accessKeySecret被人拿到，你的阿里云OSS账户就没钱了。

### 3）开启相机端

现在，用浏览器打开"camera"文件夹里的index.html，就可以开启相机端了.

打开后，浏览器会向你请求打开摄像头，点击“允许”

![图片](https://uploader.shimo.im/f/4xNY1cB5wwNzljye.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

然后点击“启动软件”，

![图片](https://uploader.shimo.im/f/OCkNe6hDiTM7tanW.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

点击左下角的“倒计时拍照”，拍好后，照片就会自动上传到阿里云OSS中。

![图片](https://uploader.shimo.im/f/JjvSFnLfSMZr9VQ9.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)


现在，你可以在阿里云“Bucket”文件管理的页面中找到最新上传的照片。

![图片](https://uploader.shimo.im/f/lNMYUFtxg6wKGZ5n.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

点击对应照片的“详情”，就可以看到对应的照片链接URL,比如我的是

[https://chimg.oss-cn-shenzhen.aliyuncs.com/lastphoto1.png](https://chimg.oss-cn-shenzhen.aliyuncs.com/lastphoto1.png)"，我们可以通过这个链接，打开对应的图片，我们的“浏览端”也是通过这个链接显示图片。

注意：由于屏幕尺寸的问题，图片可能会有些问题，后面会有具体的调试技巧。

### 4）"相机端"修改二维码和对应的文字

4.1）文字修改

上传后提示：在app.js找到“上传成功。关注公众号“柴火创客空间”，输入关键词“照片”, 对应照片编号为”（大概在103行），修改这段文字的“柴火创客”为你的公众号名称。

![图片](https://uploader.shimo.im/f/b06pILgLV9CDDkqy.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

4.2）二维码：

更换文件夹camera/images里的"qrcode.jpg"

![图片](https://uploader.shimo.im/f/Bvqur89yzXBpPk1D.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

### 5) 配置浏览端

5.1 在Bucket页面中，找到“概览” -> “访问域名” -> “Bucket域名”中找到对应的链接，记录下来，我们下一步要用。

比如，下面是名为chimg的Bucket，它的Bucket域名为"[https://chimg.oss-cn-shenzhen.aliyuncs.com](https://chimg.oss-cn-shenzhen.aliyuncs.com)"

![图片](https://uploader.shimo.im/f/DfOmtVxstT5SzUHN.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

5.2 进入文件夹photo,编辑index.html文件。在133行左右，有一个bucket_url的参数，把我们上一步（5.1）获取的链接替换在这里。

![图片](https://uploader.shimo.im/f/jv3Ur0qkorZau1Nt.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

### 6）"浏览端"测试

![图片](https://uploader.shimo.im/f/QgVnSyOG9cUFYOYJ.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

"浏览端"其实也可以在本地打开，用浏览器打开"photo"中的index.html.

检查图片上传是否正常。

如果测试没问题的话，上传“浏览端”到你在云端的服务器上，接下来，就可以在互联网浏览到你的相关照片。

### 7）"浏览端"的浏览器标签和标题

![图片](https://uploader.shimo.im/f/DhiYzCnGTeXr7xQc.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

如果你要修改浏览器标签和标题，也在"photo"的index.html中，分别是11行和第22行

![图片](https://uploader.shimo.im/f/rVGtFM7FxTo2mcKU.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

### 8）"浏览端"上传服务器

前面几步的"浏览端"都是在本地进行浏览，为了实现让用户在互联网上访问到，需要把"浏览端"上传到互联网的云服务器上。

这里的"浏览端"属于静态网页，一般直接上传到网址对应的目录上，就能通过服务器对应的链接，在任何地方通过互联网浏览你的浏览端。

上传方法有很多种，比如FTP工具上传和网页上传。不同云服务商的上传方法可能会有些不同，请查看对应云服务商的帮助文档。

### 8) 设置你的公众号

找到自动回复，设置关键词“照片”的自动回复为浏览端的URL

你可以使用HTML表示链接的方法" <a href=""></a >"

比如：

```plain
哈哈，我猜你刚刚拍了一张黑科技范儿的照片！
<a href="你的链接">照片入口在此</a >
```
最后的效果是这样的
![图片](https://uploader.shimo.im/f/pGwlzWjpUkULWQOZ.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)



## "相机端"调试技巧

### 快速查看上传的照片

当你把鼠标往下面移动，就能看到刚刚上传的图片。

![图片](https://uploader.shimo.im/f/YQxuljcfFAXitqW7.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

### app.js相关调试

由于屏幕适配的问题，拍照的图片可能会有问题，需要在camera/app.js进行一下参数的调整。

在camera/app.js搜索"#调试点1"，调整整体大小、镜像和FPS

![图片](https://uploader.shimo.im/f/fznSzXmDtUX0Slf7.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)


### css相关调试

字符间隙：

当我在电脑端调试好后，发现在树莓派上的样式发生了不少变化。

特别是字符间隙，估计是字体的字体问题。

我们在css/main.css找到"#调试点2"，设置一下“letter-spacing”，找到合适的参数。我的电脑端是-1.5px，树莓派是-0.5px;

![图片](https://uploader.shimo.im/f/vFN3N3irEs2Ivx6U.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)



背景颜色和文字颜色：

背景颜色和文字颜色都是可以调整的，

在css/main.css的“调试点3”中设置，

我们这里可以尝试修改"background"和"color"

![图片](https://uploader.shimo.im/f/idByC910J25f7oF1.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

下面是切换成其它颜色的效果

![图片](https://uploader.shimo.im/f/jdHdBcur8cKfpiWp.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

### RGB调试

不同摄像机对颜色的敏感度不同，所以我增加了颜色参数添加的功能。

你可以直接拖动页面上关于R, G, B的滑动条，也可以使用对应的快捷键

R: R+/T- 意思是按键R增加数值，按键T减少数值

G: G+/H- …

B: B+/N- …

![图片](https://uploader.shimo.im/f/mIJ4kHLD6MrGfa1n.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)


### ASCII文字的设置

需要哪些文字可以设置的，在camera/script/ascill中有个characters属性，

![图片](https://uploader.shimo.im/f/8kE5jbrsW8dTcZED.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

修改下划线内容为你要用的字符

### 物理调节 Arduino补光灯

在实际调节中，发现光线影响还是太严重了，所以临时拿身边的器材做了一个补光灯。

相关材料

* Arduino
* ws2812灯带
* 旋钮 对应文件名为analogLight

对应Arduino代码在文件夹analogLight中，主要有3个参数

![图片](https://uploader.shimo.im/f/mxgfEVx9QDIVpYJF.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)


实际上，树莓派本身控制灯带和旋钮，不过手里没有合适的连接线。所以使用了Arduino的方案。

## 树莓派配置

如果把“相机端”放在树莓派中使用，还需要一些设置

### 打开Camera功能

在树莓派系统的开始菜单点击Preferences->Raspberry Pi Configuration->Interfaces->Camera,选择Enable

![图片](https://uploader.shimo.im/f/ec25x9B4lZ0IGFMg.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

![图片](https://uploader.shimo.im/f/UJrufS80sKOsSCac.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)

### 排线摄像头

如果你使用的是排线摄像头，需要在终端输入以下3段命令，每输一段命令，按一次回车。

```plain
sudo sed -i -e "\$asnd-bcm2835" /etc/modules
sudo sed -i -e "\$abcm2835-v4l2" /etc/modules
echo "options bcm2835-v4l2 gst_v4l2src_is_broken=1" | sudo tee /etc/modprobe.d/bcm2835-v4l2.conf
```
![图片](https://uploader.shimo.im/f/A2LWcG8gl9KINEkq.png!thumbnail?fileGuid=Dy8XTYdrXDq8r3w9)


该资料参考：[enable the camera module on chromium browser](https://www.raspberrypi.org/forums/viewtopic.php?t=220261)

### USB摄像头

理论上会比排线摄像头更容易使用，没有排线摄像头的朋友可以试一下。

## 支持的浏览器

* Chrome ≥ 21
* Firefox ≥ 17 (requires`media.navigator.enabled = true`in`about:config`)
* Opera ≥ 12
## 鸣谢

* ASCII实现部分代码参考[idevelop](https://github.com/idevelop/ascii-camera)
## License

* This code is licensed under the MIT License.



