/**
 * plugins/webfontloader.js
 * Web 字体加载器
 * 文档：https://github.com/typekit/webfontloader
 * 因为众所周知的原因国内使用 Web 字体加载器体验不佳
 * 实际开发中或使用 @font-face 加载本地字体，删除此文件并删除 src/main.js 中的 loadFonts
 */
export async function loadFonts() {
  const webFontLoader = await import('webfontloader')

  // 加载 Google Fonts 字体
  webFontLoader.load({
    google: {
      families: ['Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap'],
    },
  })
}
