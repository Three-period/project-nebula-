# 摄影作品素材目录

此处仅预留上传位置，**当前没有摄影原图**，不得用项目截图或生成图作为摄影作品。

- `nature/` — 自然与植物
- `architecture/` — 城市与建筑
- `travel/` — 旅行与风景
- `details/` — 光影与细节

上传推荐 JPG / WebP / AVIF，单张图片优先使用适合 Web 的分辨率，保留原图备份并在上传前处理 EXIF 地理位置和其他隐私信息。文件名建议使用英文小写、数字、连字符，例如 `greenhouse-window-01.webp`。

上传后同步在 `assets/data/photography.js` 对应主题的 `photos` 中登记：

```js
{
  id: 'nature-001',
  src: '/public/images/photography/nature/greenhouse-window-01.webp',
  title: '你的中文作品标题',
  alt: '具体描述图片可见内容',
  description: '可选的中文作品说明'
}
```

在 `assets/data/photography-i18n.js` 的 `en.photos['nature-001']` 中补充经过确认的英文 `title`、`alt`、`description`。

仅上传文件**不会自动生成网站内容**：需要增加数据条目并完成部署。尚无图片的主题展示清晰的空状态，不显示损坏图片或虚构作品。
