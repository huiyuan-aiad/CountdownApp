/**
 * 图标加载失败处理脚本
 * 用于确保当CDN图标加载失败时能正确显示备用图标
 */

document.addEventListener('DOMContentLoaded', function() {
    // 为所有带有icon-with-fallback类的图片添加onerror处理
    const icons = document.querySelectorAll('img.icon-with-fallback');
    
    icons.forEach(function(icon) {
        // 设置onerror属性，当图片加载失败时触发
        icon.onerror = function() {
            // 添加onerror属性作为标记，CSS会根据这个属性显示备用图标
            this.setAttribute('onerror', '');
            // 防止图片显示为破损图标
            this.style.visibility = 'hidden';
            // 确保备用图标可见
            this.style.position = 'relative';
            return true; // 阻止默认错误处理
        };
        
        // 如果图片已经加载完成但失败了，手动触发onerror
        if (icon.complete && (icon.naturalWidth === 0 || icon.naturalHeight === 0)) {
            icon.onerror();
        }
    });
});