"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
/**
 * 使用 Iconify SVG 框架创建图标的示例
 * 它从以下位置创建图标包：
 * - 所有 SVG 文件
 * - 自定义 JSON 文件
 * - Iconify 图标集
 * - SVG 框架
 * 模板示例使用 Iconify Tools 导入和清理图标。有关 Iconify Tools 文档请参考：https://docs.iconify.design/tools/tools2/
 */
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
// 安装命令：npm install --save-dev @iconify/tools @iconify/utils @iconify/json @iconify/iconify
const tools_1 = require("@iconify/tools");
const utils_1 = require("@iconify/utils");
const sources = {
  svg: [
    {
      dir: 'src/assets/images/iconify-svg',
      monotone: false,
      prefix: 'custom',
    },
    // {
    //   dir: 'emojis',
    //   monotone: false,
    //   prefix: 'emoji',
    // },
  ],
  icons: [
    // 'mdi:home',
    // 'mdi:account',
    // 'mdi:login',
    // 'mdi:logout',
    // 'octicon:book-24',
    // 'octicon:code-square-24',
  ],
  json: [
    // 自定义 Iconify JSON 文件
    // @iconify/json 是包名，/json/xxx.json 是文件所在的目录和文件名)
    require.resolve('@iconify-json/tabler/icons.json'),
    {
      filename: require.resolve('@iconify-json/fa/icons.json'),
      icons: [
        'weibo',
        'google',
        'twitter',
        'circle',
        'qq',
        'github',
      ],
    },
    // 仅包含少量图标的自定义文件
    // {
    //   filename: require.resolve('@iconify-json/line-md/icons.json'),
    //   icons: [
    //     'home-twotone-alt',
    //     'github',
    //     'document-list',
    //     'document-code',
    //     'image-twotone',
    //   ],
    // },
  ],
};

// Iconify 组件（这会更改生成文件中的导入语句）
// 可用选项：'React 使用 @iconify/react'，Vue3 使用 '@iconify/vue'，Svelte 使用 '@iconify/svelte'
const component = '@iconify/vue';
// 使用 require() 而不是 import 时设置为 true
const commonJS = false;
// 保存图标包文件
const target = (0, node_path_1.join)(__dirname, 'icons-bundle.js');

// eslint-disable-next-line sonarjs/cognitive-complexity
(async function () {
  // 创建图标包的入口函数
  let bundle = commonJS
    ? `const { addCollection } = require('${component}');\n\n`
    : `import { addCollection } from '${component}';\n\n`;
  // 如果目标文件所在的目录不存在，则创建目录
  const dir = (0, node_path_1.dirname)(target);
  try {
    await node_fs_1.promises.mkdir(dir, {
      recursive: true,
    });
  } catch (err) {
    console.error(err);
  }

  // 将 sources.icons 转换为 sources.json
  if (sources.icons) {
    const sourcesJSON = sources.json ? sources.json : (sources.json = []);
    // 按前缀排序图标
    const organizedList = organizeIconsList(sources.icons);
    for (const prefix in organizedList) {
      const filename = require.resolve(`@iconify/json/json/${prefix}.json`);
      sourcesJSON.push({
        filename,
        icons: organizedList[prefix],
      });
    }
  }

  // 打包 JSON 文件
  if (sources.json) {
    for (let i = 0; i < sources.json.length; i++) {
      const item = sources.json[i];
      // 加载图标集
      const filename = typeof item === 'string' ? item : item.filename;
      let content = JSON.parse(await node_fs_1.promises.readFile(filename, 'utf8'));
      // 过滤图标
      if (typeof item !== 'string' && item.icons?.length) {
        const filteredContent = (0, utils_1.getIcons)(content, item.icons);
        if (!filteredContent)
          throw new Error(`Cannot find required icons in ${filename}`);
        content = filteredContent;
      }
      // 移除元数据并添加到图标包中
      removeMetaData(content);
      for (const key in content) {
        if (key === 'prefix' && content.prefix === 'tabler') {
          for (const k in content.icons)
            content.icons[k].body = content.icons[k].body.replace(/stroke-width="2"/g, 'stroke-width="1.5"');
        }
      }
      (0, utils_1.minifyIconSet)(content);
      bundle += `addCollection(${JSON.stringify(content)});\n`;
      console.log(`Bundled icons from ${filename}`);
    }
  }
  /**
   * 自定义 SVG
   */
  if (sources.svg) {
    for (let i = 0; i < sources.svg.length; i++) {
      const source = sources.svg[i];
      // 导入图标
      const iconSet = await (0, tools_1.importDirectory)(source.dir, {
        prefix: source.prefix,
      });

      // 验证、移除、修复颜色和优化图标
      await iconSet.forEach(async (name, type) => {
        if (type !== 'icon')
          return;
        // 获取 SVG 实例
        const svg = iconSet.toSVG(name);
        if (!svg) {
          // 移除无效图标
          iconSet.remove(name);
          return;
        }

        // 清理和优化图标
        try {
          // 清理图标代码
          await (0, tools_1.cleanupSVG)(svg);
          if (source.monotone) {
            // 将颜色替换为当前颜色 currentColor，如果没有则添加
            // 如果图标不是单色的，请删除此代码

          }
          // 优化图标
          await (0, tools_1.runSVGO)(svg);
        } catch (err) {
          // 无效图标
          console.error(`Error parsing ${name} from ${source.dir}:`, err);
          iconSet.remove(name);
          return;
        }
        // 使用 SVG 实例更新图标
        iconSet.fromSVG(name, svg);
      });
      console.log(`Bundled ${iconSet.count()} icons from ${source.dir}`);
      // 导出为 JSON
      const content = iconSet.export();
      bundle += `addCollection(${JSON.stringify(content)});\n`;
    }
  }

  // 保存到文件
  await node_fs_1.promises.writeFile(target, bundle, 'utf8');
  console.log(`Saved ${target} (${bundle.length} bytes)`);
})().catch(err => {
  console.error(err);
});

/**
 * 从图标集中删除元数据
 */
function removeMetaData(iconSet) {
  const props = [
    'info',
    'chars',
    'categories',
    'themes',
    'prefixes',
    'suffixes',
  ];
  props.forEach(prop => {
    delete iconSet[prop];
  });
}

// 按前缀排序图标
function organizeIconsList(icons) {
  const sorted = Object.create(null);
  icons.forEach(icon => {
    const item = (0, utils_1.stringToIcon)(icon);
    if (!item)
      return;
    const prefix = item.prefix;
    const prefixList = sorted[prefix]
      ? sorted[prefix]
      : (sorted[prefix] = []);
    const name = item.name;
    if (!prefixList.includes(name))
      prefixList.push(name);
  });
  return sorted;
}
