module.exports = {
    extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
    plugins: ["stylelint-scss"],
    defaultSeverity: "warning",
    rules: {
      // 校验规则略
      // 不要使用已被 autoprefixer 支持的浏览器前缀
      'media-feature-name-no-vendor-prefix': true,
      'at-rule-no-vendor-prefix': true,
      'selector-no-vendor-prefix': true,
      'property-no-vendor-prefix': true,
      'value-no-vendor-prefix': true,
      // 最多允许嵌套20层，去掉默认的最多2层
      'max-nesting-depth': 20,
      // 颜色值要小写
      'color-hex-case': 'lower',
      // 颜色值能短则短
      'color-hex-length': 'short',
      // 不能用important
      'declaration-no-important': true,
    }
  }