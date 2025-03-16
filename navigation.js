/**
 * 导航和按钮点击事件处理脚本
 * 用于处理页面间的导航和按钮点击事件
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Navigation.js: DOM加载完成，初始化导航功能');
    
    // 特别处理返回按钮 - 使用更具体的选择器
    const backButton = document.querySelector('button.mr-2.rounded-full img[alt="返回"], button.mr-2.rounded-full img[alt="back"]');
    if (backButton) {
        const parentButton = backButton.closest('button');
        console.log('Navigation.js: 找到返回按钮，添加点击事件监听器');
        
        // 无论按钮是否有ID，都添加事件监听器
        parentButton.addEventListener('click', function(event) {
            console.log('Navigation.js: 返回按钮被点击，跳转到index.html');
            window.location.href = 'index.html';
            event.preventDefault();
            event.stopPropagation();
        });
    } else {
        console.log('Navigation.js: 未找到返回按钮');
    }
    
    // 特别处理底部导航栏的首页按钮
    const homeButton = document.querySelector('button img[alt="首页"], button img[alt="home"]');
    if (homeButton) {
        const parentButton = homeButton.closest('button');
        console.log('Navigation.js: 找到首页按钮，添加点击事件监听器');
        
        // 无论按钮是否有ID，都添加事件监听器
        parentButton.addEventListener('click', function(event) {
            console.log('Navigation.js: 首页按钮被点击，跳转到index.html');
            window.location.href = 'index.html';
            event.preventDefault();
            event.stopPropagation();
        });
    } else {
        console.log('Navigation.js: 未找到首页按钮');
    }
    
    // 获取所有导航按钮
    const navButtons = document.querySelectorAll('button');
    console.log(`Navigation.js: 找到${navButtons.length}个按钮`);
    
    // 为所有按钮添加点击事件监听器
    navButtons.forEach(function(button, index) {
        // 为每个按钮添加一个唯一的调试ID
        button.setAttribute('data-nav-id', `nav-btn-${index}`);
        console.log(`Navigation.js: 为按钮[${index}]添加点击事件监听器`);
        button.addEventListener('click', function(event) {
            // 获取按钮内部的图片元素和文本内容
            const imgElement = button.querySelector('img');
            const buttonText = button.textContent.trim();
            
            console.log(`Navigation.js: 按钮[${index}]被点击，文本内容: "${buttonText}"`);
            
            // 根据按钮内容或图片alt属性确定操作
            if (imgElement) {
                const imgAlt = imgElement.alt;
                console.log(`Navigation.js: 按钮[${index}]包含图片，alt属性: "${imgAlt}"`);
                
                // 处理返回按钮
                if (imgAlt === '返回' || imgAlt.includes('back')) {
                    console.log('Navigation.js: 返回按钮被点击');
                    // 使用直接跳转到index.html替代window.history.back()
                    // 因为在直接打开文件时，history.back()可能没有历史记录可返回
                    window.location.href = 'index.html';
                    event.preventDefault(); // 阻止默认行为
                    event.stopPropagation(); // 阻止事件冒泡
                    return;
                }
                
                // 处理底部导航栏按钮
                if (imgAlt === '首页' || imgAlt === '首頁' || imgAlt.includes('home')) {
                    console.log('Navigation.js: 首页按钮被点击，跳转到index.html');
                    window.location.href = 'index.html';
                    return;
                }
                
                if (imgAlt === '日历' || imgAlt === '日曆' || imgAlt.includes('calendar')) {
                    console.log('Navigation.js: 日历按钮被点击');
                    // 实现日历功能 - 显示日历视图
                    showCalendarView();
                    return;
                }
                
                if (imgAlt === '添加' || imgAlt.includes('add') || imgAlt.includes('plus')) {
                    console.log('Navigation.js: 添加按钮被点击，跳转到add_countdown.html');
                    window.location.href = 'add_countdown.html';
                    return;
                }
                
                if (imgAlt === '提醒' || imgAlt.includes('reminder') || imgAlt.includes('bell')) {
                    console.log('Navigation.js: 提醒按钮被点击');
                    // 实现提醒功能 - 显示提醒列表
                    showRemindersList();
                    return;
                }
                
                if (imgAlt === '我的' || imgAlt.includes('my') || imgAlt.includes('user')) {
                    console.log('Navigation.js: 我的按钮被点击');
                    // 实现个人中心功能 - 显示用户信息
                    showUserProfile();
                    return;
                }
                
                // 处理搜索按钮
                if (imgAlt === '搜索' || imgAlt.includes('search')) {
                    // 实现搜索功能
                    showSearchInterface();
                    return;
                }
                
                // 处理设置按钮
                if (imgAlt === '设置' || imgAlt.includes('settings')) {
                    // 实现设置功能
                    showSettingsInterface();
                    return;
                }
                
                // 处理编辑按钮
                if (imgAlt === '编辑' || imgAlt.includes('edit')) {
                    // 获取当前倒数日信息并跳转到编辑页面
                    editCurrentCountdown();
                    return;
                }
                
                // 处理更多按钮
                if (imgAlt === '更多' || imgAlt.includes('more')) {
                    // 显示更多选项菜单
                    showMoreOptions(button);
                    return;
                }
            }
            
            // 处理分类标签按钮
            if (button.classList.contains('rounded-full') && !button.querySelector('img')) {
                // 移除所有分类按钮的active类
                const categoryButtons = document.querySelectorAll('.rounded-full');
                categoryButtons.forEach(btn => {
                    if (!btn.querySelector('img')) {
                        btn.classList.remove('bg-indigo-600', 'text-white');
                        btn.classList.add('bg-white', 'border', 'border-gray-200', 'text-gray-700');
                    }
                });
                
                // 为当前点击的按钮添加active类
                button.classList.remove('bg-white', 'border', 'border-gray-200', 'text-gray-700');
                button.classList.add('bg-indigo-600', 'text-white');
                
                // 实现过滤倒数日列表的逻辑
                filterCountdownsByCategory(buttonText);
                return;
            }
            
            // 处理倒数日卡片点击
            if (button.closest('.countdown-card')) {
                window.location.href = 'countdown_detail.html';
                return;
            }
            
            // 处理保存按钮
            if (buttonText === '保存' || buttonText.includes('Save')) {
                // 实现保存倒数日的功能
                saveCountdown();
                return;
            }

            // 处理分享按钮
            if (buttonText === '分享' || buttonText.includes('Share')) {
                // 实现分享功能
                shareCountdown();
                return;
            }
        });
    });

    // 实现日历功能
    function showCalendarView() {
        // 创建日历视图元素
        const calendarView = document.createElement('div');
        calendarView.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        calendarView.innerHTML = `
            <div class="bg-white rounded-xl p-4 w-11/12 max-w-md">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-bold">日历视图</h2>
                    <button class="close-btn p-2 rounded-full hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                <div class="calendar-container p-2">
                    <div class="grid grid-cols-7 gap-1 text-center">
                        <div class="text-gray-500 font-medium">日</div>
                        <div class="text-gray-500 font-medium">一</div>
                        <div class="text-gray-500 font-medium">二</div>
                        <div class="text-gray-500 font-medium">三</div>
                        <div class="text-gray-500 font-medium">四</div>
                        <div class="text-gray-500 font-medium">五</div>
                        <div class="text-gray-500 font-medium">六</div>
                    </div>
                    <div class="grid grid-cols-7 gap-1 mt-2">
                        ${generateCalendarDays()}
                    </div>
                </div>
                <div class="mt-4 text-center">
                    <p class="text-gray-600">点击日期查看当天的倒数日</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(calendarView);
        
        // 添加关闭按钮事件
        calendarView.querySelector('.close-btn').addEventListener('click', function() {
            document.body.removeChild(calendarView);
        });
        
        // 添加日期点击事件
        const dateCells = calendarView.querySelectorAll('.date-cell');
        dateCells.forEach(cell => {
            cell.addEventListener('click', function() {
                alert(`将显示 ${cell.textContent} 日的倒数日列表`);
            });
        });
    }
    
    // 生成日历天数
    function generateCalendarDays() {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        
        // 获取当月第一天是星期几
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        
        // 获取当月天数
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        let calendarHTML = '';
        
        // 添加空白格子
        for (let i = 0; i < firstDay; i++) {
            calendarHTML += '<div class="h-10"></div>';
        }
        
        // 添加日期格子
        for (let i = 1; i <= daysInMonth; i++) {
            const isToday = i === today.getDate();
            calendarHTML += `
                <div class="date-cell h-10 flex items-center justify-center rounded-full cursor-pointer ${isToday ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100'}">
                    ${i}
                </div>
            `;
        }
        
        return calendarHTML;
    }

    
    // 实现提醒列表功能 - 占位函数
    function showRemindersList() {
        console.log('提醒功能尚未实现，这是一个占位函数');
        alert('提醒功能正在开发中，敬请期待！');
    }
    
    // 实现个人中心功能 - 占位函数
    function showUserProfile() {
        console.log('个人中心功能尚未实现，这是一个占位函数');
        alert('个人中心功能正在开发中，敬请期待！');
    }
    
    // 实现搜索功能 - 占位函数
    function showSearchInterface() {
        console.log('搜索功能尚未实现，这是一个占位函数');
        alert('搜索功能正在开发中，敬请期待！');
    }
    
    // 实现设置功能 - 占位函数
    function showSettingsInterface() {
        console.log('设置功能尚未实现，这是一个占位函数');
        alert('设置功能正在开发中，敬请期待！');
    }
    
    // 实现编辑倒数日功能 - 占位函数
    function editCurrentCountdown() {
        console.log('编辑倒数日功能尚未实现，这是一个占位函数');
        window.location.href = 'add_countdown.html';
    }
    
    // 实现更多选项功能 - 占位函数
    function showMoreOptions(button) {
        console.log('更多选项功能尚未实现，这是一个占位函数');
        alert('更多选项功能正在开发中，敬请期待！');
    }
    
    // 实现过滤倒数日列表功能 - 占位函数
    function filterCountdownsByCategory(category) {
        console.log(`过滤倒数日列表功能尚未实现，选择的分类: ${category}`);
        // 这里应该实现根据分类过滤倒数日列表的逻辑
    }
    
    // 实现保存倒数日功能 - 占位函数
    function saveCountdown() {
        console.log('保存倒数日功能尚未实现，这是一个占位函数');
        alert('倒数日已保存！');
        window.location.href = 'index.html';
    }
    
    // 实现分享倒数日功能 - 占位函数
    function shareCountdown() {
        console.log('分享倒数日功能尚未实现，这是一个占位函数');
        alert('分享功能正在开发中，敬请期待！');
    }

})