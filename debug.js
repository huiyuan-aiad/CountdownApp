/**
 * 调试脚本 - 用于检测和修复按钮点击事件问题
 */

// 在页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('调试脚本已加载');
    
    // 检查navigation.js是否已加载
    const scripts = document.querySelectorAll('script');
    let navigationLoaded = false;
    
    scripts.forEach(script => {
        if (script.src.includes('navigation.js')) {
            navigationLoaded = true;
            console.log('navigation.js已加载');
        }
    });
    
    if (!navigationLoaded) {
        console.log('navigation.js未加载，正在动态添加...');
        // 动态加载navigation.js
        const navScript = document.createElement('script');
        navScript.src = 'navigation.js';
        navScript.onload = function() {
            console.log('navigation.js已成功加载');
        };
        navScript.onerror = function() {
            console.error('navigation.js加载失败');
        };
        document.body.appendChild(navScript);
    }
    
    // 为所有按钮添加调试事件监听器
    const allButtons = document.querySelectorAll('button');
    console.log(`找到${allButtons.length}个按钮，正在添加调试事件监听器...`);
    
    allButtons.forEach((button, index) => {
        // 为每个按钮添加一个唯一的调试ID
        button.setAttribute('data-debug-id', `btn-${index}`);
        
        // 添加点击事件监听器
        button.addEventListener('click', function(event) {
            console.log(`按钮[${index}]被点击`, this);
            
            // 获取按钮内部的图片元素和文本内容
            const imgElement = this.querySelector('img');
            const buttonText = this.textContent.trim();
            
            console.log(`按钮文本: "${buttonText}"`);
            if (imgElement) {
                console.log(`按钮图片alt: "${imgElement.alt}"`);
            }
            
            // 根据按钮内容或图片alt属性确定操作
            if (imgElement) {
                const imgAlt = imgElement.alt;
                
                // 处理返回按钮
                if (imgAlt === '返回' || imgAlt.includes('back')) {
                    console.log('触发返回操作');
                    window.history.back();
                    return;
                }
                
                // 处理底部导航栏按钮
                if (imgAlt === '首页' || imgAlt.includes('home')) {
                    console.log('触发首页导航');
                    window.location.href = 'index.html';
                    return;
                }
                
                if (imgAlt === '日历' || imgAlt.includes('calendar')) {
                    console.log('触发日历功能');
                    alert('日历功能即将上线!');
                    return;
                }
                
                if (imgAlt === '添加' || imgAlt.includes('add') || imgAlt.includes('plus')) {
                    console.log('触发添加功能');
                    window.location.href = 'add_countdown.html';
                    return;
                }
                
                if (imgAlt === '提醒' || imgAlt.includes('reminder') || imgAlt.includes('bell')) {
                    console.log('触发提醒功能');
                    alert('提醒功能即将上线!');
                    return;
                }
                
                if (imgAlt === '我的' || imgAlt.includes('my') || imgAlt.includes('user')) {
                    console.log('触发个人中心功能');
                    alert('个人中心功能即将上线!');
                    return;
                }
                
                if (imgAlt === '更多' || imgAlt.includes('more')) {
                    console.log('触发更多选项功能');
                    alert('更多选项功能即将上线!');
                    return;
                }
                
                if (imgAlt === '搜索' || imgAlt.includes('search')) {
                    console.log('触发搜索功能');
                    alert('搜索功能即将上线!');
                    return;
                }
                
                if (imgAlt === '设置' || imgAlt.includes('settings')) {
                    console.log('触发设置功能');
                    // 不再显示alert，让language-switcher.js中的showSettingsMenu函数处理
                    // 检查是否已经定义了showSettingsMenu函数
                    if (typeof showSettingsMenu !== 'function') {
                        console.log('showSettingsMenu函数未定义，显示默认提示');
                        // 如果showSettingsMenu未定义，则显示默认提示
                        alert('设置功能即将上线!');
                    }
                    return;
                }
            }
            
            // 处理分类标签按钮
            if (this.classList.contains('rounded-full') && !this.querySelector('img')) {
                console.log('触发分类标签切换');
                // 移除所有分类按钮的active类
                const categoryButtons = document.querySelectorAll('.rounded-full');
                categoryButtons.forEach(btn => {
                    if (!btn.querySelector('img')) {
                        btn.classList.remove('bg-indigo-600', 'text-white');
                        btn.classList.add('bg-white', 'border', 'border-gray-200', 'text-gray-700');
                    }
                });
                
                // 为当前点击的按钮添加active类
                this.classList.remove('bg-white', 'border', 'border-gray-200', 'text-gray-700');
                this.classList.add('bg-indigo-600', 'text-white');
                
                console.log('分类已切换为:', buttonText);
                return;
            }
            
            // 处理倒数日卡片点击
            if (this.closest('.countdown-card')) {
                console.log('触发倒数日详情页面');
                window.location.href = 'countdown_detail.html';
                return;
            }
        });
    });
});