// 语言切换功能

// 获取当前语言或设置默认语言
function getCurrentLanguage() {
    return localStorage.getItem('app_language') || 'zh-CN'; // 默认为简体中文
}

// 设置语言
function setLanguage(langCode) {
    localStorage.setItem('app_language', langCode);
    document.documentElement.lang = langCode;
    updatePageTexts();
    updateDirectionForArabic(langCode);
}

// 更新页面上的所有文本
function updatePageTexts() {
    const currentLang = getCurrentLanguage();
    const langData = languages[currentLang];
    
    if (!langData) return;
    
    // 更新页面标题
    document.title = langData['app_name'] + (document.title.includes('-') ? ' - ' + langData[getPageType()] : '');
    
    // 更新所有带有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (langData[key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (key.includes('placeholder')) {
                    element.placeholder = langData[key];
                } else {
                    element.value = langData[key];
                }
            } else {
                element.textContent = langData[key];
            }
        }
    });
    
    // 更新所有图片的alt属性
    document.querySelectorAll('img[data-i18n-alt]').forEach(img => {
        const key = img.getAttribute('data-i18n-alt');
        if (langData[key]) {
            img.alt = langData[key];
        }
    });
}

// 为阿拉伯语设置从右到左的文本方向
function updateDirectionForArabic(langCode) {
    if (langCode === 'ar') {
        document.body.style.direction = 'rtl';
        document.querySelectorAll('.flex').forEach(el => {
            if (el.classList.contains('justify-between')) {
                // 保持两端对齐的布局不变
            } else {
                // 反转其他flex布局的方向
                el.style.flexDirection = el.style.flexDirection === 'row-reverse' ? 'row' : 'row-reverse';
            }
        });
    } else {
        document.body.style.direction = 'ltr';
        document.querySelectorAll('.flex').forEach(el => {
            el.style.flexDirection = '';
        });
    }
}

// 获取当前页面类型
function getPageType() {
    const path = window.location.pathname;
    if (path.includes('add_countdown.html')) return 'add_countdown';
    if (path.includes('countdown_detail.html')) return 'countdown_detail';
    return 'home_title';
}

// 创建语言选择界面
function createLanguageSelector() {
    // 创建语言选择容器
    const container = document.createElement('div');
    container.id = 'language-selector';
    container.className = 'glass-effect rounded-xl p-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-md z-50 hidden';
    
    // 创建标题
    const title = document.createElement('h2');
    title.className = 'text-xl font-bold text-indigo-900 mb-4';
    title.setAttribute('data-i18n', 'language_settings');
    title.textContent = languages[getCurrentLanguage()]['language_settings'] || '语言设置';
    
    // 创建语言列表
    const langList = document.createElement('div');
    langList.className = 'space-y-2';
    
    // 添加所有支持的语言
    const supportedLanguages = {
        'zh-CN': '简体中文',
        'zh-TW': '繁體中文',
        'en': 'English',
        'fr': 'Français',
        'es': 'Español',
        'pt': 'Português',
        'ar': 'العربية',
        'tr': 'Türkçe',
        'ms': 'Bahasa Melayu'
    };
    
    for (const [langCode, langName] of Object.entries(supportedLanguages)) {
        const langOption = document.createElement('div');
        langOption.className = `p-3 rounded-lg flex justify-between items-center ${getCurrentLanguage() === langCode ? 'bg-indigo-100 text-indigo-700' : 'bg-white hover:bg-gray-50'}`;
        langOption.onclick = () => {
            setLanguage(langCode);
            document.querySelectorAll('#language-selector .bg-indigo-100').forEach(el => {
                el.classList.remove('bg-indigo-100', 'text-indigo-700');
                el.classList.add('bg-white', 'hover:bg-gray-50');
            });
            langOption.classList.remove('bg-white', 'hover:bg-gray-50');
            langOption.classList.add('bg-indigo-100', 'text-indigo-700');
        };
        
        // 创建左侧包含国旗和语言名称的容器
        const leftContainer = document.createElement('div');
        leftContainer.className = 'flex items-center';
        
        // 添加国旗图标
        const flagIcon = document.createElement('img');
        flagIcon.src = `./icons/flags/${langCode}.svg`;
        flagIcon.className = 'w-5 h-5 mr-2 icon-with-fallback';
        flagIcon.alt = langName;
        
        const langNameSpan = document.createElement('span');
        langNameSpan.textContent = langName;
        
        // 将国旗和语言名称添加到左侧容器
        leftContainer.appendChild(flagIcon);
        leftContainer.appendChild(langNameSpan);
        
        const checkIcon = document.createElement('img');
        checkIcon.src = './icons/check.svg';
        checkIcon.className = `w-5 h-5 icon-with-fallback ${getCurrentLanguage() === langCode ? '' : 'hidden'}`;
        checkIcon.alt = 'Selected';
        
        langOption.appendChild(leftContainer);
        langOption.appendChild(checkIcon);
        langList.appendChild(langOption);
    }
    
    // 创建关闭按钮
    const closeButton = document.createElement('button');
    closeButton.className = 'mt-4 w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors';
    closeButton.setAttribute('data-i18n', 'back');
    closeButton.textContent = languages[getCurrentLanguage()]['back'] || '返回';
    closeButton.onclick = () => {
        container.classList.add('hidden');
        document.getElementById('overlay').classList.add('hidden');
    };
    
    // 组装语言选择器
    container.appendChild(title);
    container.appendChild(langList);
    container.appendChild(closeButton);
    
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-40 hidden';
    overlay.onclick = () => {
        container.classList.add('hidden');
        overlay.classList.add('hidden');
    };
    
    // 添加到页面
    document.body.appendChild(overlay);
    document.body.appendChild(container);
    
    return container;
}

// 显示语言选择器
function showLanguageSelector() {
    let selector = document.getElementById('language-selector');
    if (!selector) {
        selector = createLanguageSelector();
    }
    
    selector.classList.remove('hidden');
    document.getElementById('overlay').classList.remove('hidden');
}

// 在设置按钮上添加点击事件
function setupLanguageButton() {
    // 在设置按钮上添加点击事件 - 使用更直接的选择器
    let settingsButtons = [];
    
    // 首先尝试通过图片src属性查找
    const imgButtons = document.querySelectorAll('button img[src*="settings.svg"]');
    imgButtons.forEach(img => settingsButtons.push(img.parentElement));
    
    // 如果没找到，尝试通过alt属性查找
    if (settingsButtons.length === 0) {
        const altButtons = document.querySelectorAll('button img[alt="设置"]');
        altButtons.forEach(img => settingsButtons.push(img.parentElement));
    }
    
    // 如果仍然没找到，尝试查找带有icon-with-fallback类的图片
    if (settingsButtons.length === 0) {
        const allButtons = document.querySelectorAll('button');
        allButtons.forEach(button => {
            const img = button.querySelector('img.icon-with-fallback');
            if (img && (img.alt === '设置' || img.src.includes('settings'))) {
                settingsButtons.push(button);
            }
        });
    }
    
    console.log('找到设置按钮数量:', settingsButtons.length); // 调试信息
    
    settingsButtons.forEach(button => {
        console.log('处理设置按钮:', button); // 调试信息
        
        // 移除现有的点击事件（如果有）
        button.removeEventListener('click', showSettingsMenu);
        
        // 添加新的点击事件
        button.addEventListener('click', showSettingsMenu);
        
        console.log('设置按钮绑定事件完成'); // 调试信息
    });
}

// 显示设置菜单
function showSettingsMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('设置按钮被点击');
    
    // 移除已存在的设置菜单
    const existingMenu = document.getElementById('settings-menu');
    if (existingMenu) {
        existingMenu.remove();
        return; // 如果菜单已存在，则关闭它并返回
    }
    
    // 创建设置菜单
    const settingsMenu = document.createElement('div');
    settingsMenu.className = 'glass-effect rounded-xl p-2 fixed right-4 top-16 z-30';
    settingsMenu.id = 'settings-menu';
    
    // 添加语言设置选项
    const languageOption = document.createElement('button');
    languageOption.className = 'w-full text-left px-4 py-2 rounded-lg hover:bg-indigo-100 flex items-center';
    
    const langIcon = document.createElement('img');
    langIcon.src = './icons/globe.svg';
    langIcon.className = 'w-5 h-5 mr-2 icon-with-fallback';
    langIcon.setAttribute('data-i18n-alt', 'language');
    langIcon.alt = languages[getCurrentLanguage()]['language'] || '语言';
    
    const langText = document.createElement('span');
    langText.setAttribute('data-i18n', 'language');
    langText.textContent = languages[getCurrentLanguage()]['language'] || '语言';
    
    languageOption.appendChild(langIcon);
    languageOption.appendChild(langText);
    languageOption.onclick = () => {
        settingsMenu.remove();
        showLanguageSelector();
    };
    
    // 添加主题设置选项（未实现功能）
    const themeOption = document.createElement('button');
    themeOption.className = 'w-full text-left px-4 py-2 rounded-lg hover:bg-indigo-100 flex items-center';
    
    const themeIcon = document.createElement('img');
    themeIcon.src = './icons/moon.svg';
    themeIcon.className = 'w-5 h-5 mr-2 icon-with-fallback';
    themeIcon.alt = '主题';
    
    const themeText = document.createElement('span');
    themeText.textContent = '主题';
    
    themeOption.appendChild(themeIcon);
    themeOption.appendChild(themeText);
    themeOption.onclick = () => {
        settingsMenu.remove();
        showFeatureComingSoon('主题设置');
    };
    
    // 添加通知设置选项（未实现功能）
    const notificationOption = document.createElement('button');
    notificationOption.className = 'w-full text-left px-4 py-2 rounded-lg hover:bg-indigo-100 flex items-center';
    
    const notificationIcon = document.createElement('img');
    notificationIcon.src = './icons/bell.svg';
    notificationIcon.className = 'w-5 h-5 mr-2 icon-with-fallback';
    notificationIcon.alt = '通知';
    
    const notificationText = document.createElement('span');
    notificationText.textContent = '通知设置';
    
    notificationOption.appendChild(notificationIcon);
    notificationOption.appendChild(notificationText);
    notificationOption.onclick = () => {
        settingsMenu.remove();
        showFeatureComingSoon('通知设置');
    };
    
    // 添加关于选项（未实现功能）
    const aboutOption = document.createElement('button');
    aboutOption.className = 'w-full text-left px-4 py-2 rounded-lg hover:bg-indigo-100 flex items-center';
    
    const aboutIcon = document.createElement('img');
    aboutIcon.src = './icons/info.svg';
    aboutIcon.className = 'w-5 h-5 mr-2 icon-with-fallback';
    aboutIcon.alt = '关于';
    
    const aboutText = document.createElement('span');
    aboutText.textContent = '关于';
    
    aboutOption.appendChild(aboutIcon);
    aboutOption.appendChild(aboutText);
    aboutOption.onclick = () => {
        settingsMenu.remove();
        showFeatureComingSoon('关于');
    };
    
    // 将所有选项添加到菜单
    settingsMenu.appendChild(languageOption);
    settingsMenu.appendChild(themeOption);
    settingsMenu.appendChild(notificationOption);
    settingsMenu.appendChild(aboutOption);
    
    // 添加到页面
    document.body.appendChild(settingsMenu);
    
    // 点击其他地方关闭菜单
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!settingsMenu.contains(e.target) && !e.target.closest('button img[src*="settings.svg"]')) {
                settingsMenu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 100);
}

// 显示功能即将上线提示
function showFeatureComingSoon(featureName) {
    // 创建提示容器
    const container = document.createElement('div');
    container.className = 'glass-effect rounded-xl p-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-md z-50';
    container.id = 'feature-coming-soon';
    
    // 创建标题
    const title = document.createElement('h2');
    title.className = 'text-xl font-bold text-indigo-900 mb-4 text-center';
    title.textContent = featureName;
    
    // 创建消息
    const message = document.createElement('p');
    message.className = 'text-gray-700 text-center mb-4';
    message.textContent = '该功能即将上线，敬请期待！';
    
    // 创建关闭按钮
    const closeButton = document.createElement('button');
    closeButton.className = 'mt-2 w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors';
    closeButton.textContent = '确定';
    closeButton.onclick = () => {
        container.remove();
        document.getElementById('overlay').classList.add('hidden');
    };
    
    // 组装提示
    container.appendChild(title);
    container.appendChild(message);
    container.appendChild(closeButton);
    
    // 创建或显示遮罩层
    let overlay = document.getElementById('overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'overlay';
        overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-40';
        overlay.onclick = () => {
            container.remove();
            overlay.classList.add('hidden');
        };
        document.body.appendChild(overlay);
    } else {
        overlay.classList.remove('hidden');
    }
    
    // 添加到页面
    document.body.appendChild(container);
}

// 初始化语言功能
function initLanguage() {
    // 确保languages对象已加载
    if (typeof languages === 'undefined') {
        console.error('languages对象未定义，等待加载...');
        // 等待100ms后重试
        setTimeout(initLanguage, 100);
        return;
    }
    
    console.log('初始化语言功能...');
    
    // 设置初始语言
    const currentLang = getCurrentLanguage();
    document.documentElement.lang = currentLang;
    
    // 为页面元素添加data-i18n属性
    addI18nAttributes();
    
    // 更新页面文本
    updatePageTexts();
    
    // 更新文本方向（针对阿拉伯语）
    updateDirectionForArabic(currentLang);
    
    // 设置语言按钮
    setupLanguageButton();
    
    console.log('语言功能初始化完成');
}

// 为页面元素添加data-i18n属性
function addI18nAttributes() {
    // 标题和导航
    const titleElement = document.querySelector('h1');
    if (titleElement && titleElement.textContent.includes('倒数日')) {
        titleElement.setAttribute('data-i18n', 'home_title');
    }
    
    // 分类标签
    const categoryButtons = document.querySelectorAll('.rounded-full');
    categoryButtons.forEach(button => {
        const text = button.textContent.trim();
        if (text === '全部') button.setAttribute('data-i18n', 'all');
        if (text === '学习') button.setAttribute('data-i18n', 'study');
        if (text === '工作') button.setAttribute('data-i18n', 'work');
        if (text === '生活') button.setAttribute('data-i18n', 'life');
        if (text === '节日') button.setAttribute('data-i18n', 'festival');
    });
    
    // 底部导航
    const navTexts = document.querySelectorAll('.flex.flex-col.items-center span');
    navTexts.forEach(span => {
        const text = span.textContent.trim();
        if (text === '首页') span.setAttribute('data-i18n', 'nav_home');
        if (text === '日历') span.setAttribute('data-i18n', 'nav_calendar');
        if (text === '添加') span.setAttribute('data-i18n', 'nav_add');
        if (text === '提醒') span.setAttribute('data-i18n', 'nav_reminder');
        if (text === '我的') span.setAttribute('data-i18n', 'nav_my');
    });
    
    // 倒数日卡片
    document.querySelectorAll('.countdown-card').forEach(card => {
        const daysLeftText = card.querySelector('.text-gray-600.text-sm');
        if (daysLeftText && daysLeftText.textContent.includes('距离还有')) {
            daysLeftText.setAttribute('data-i18n', 'days_left');
        }
        
        const dayUnit = card.querySelector('.text-3xl + p');
        if (dayUnit && dayUnit.textContent.includes('天')) {
            dayUnit.setAttribute('data-i18n', 'day');
        }
    });
    
    // 添加倒数日页面
    if (window.location.pathname.includes('add_countdown.html')) {
        const addTitle = document.querySelector('h1');
        if (addTitle) addTitle.setAttribute('data-i18n', 'add_countdown');
        
        const saveButton = document.querySelector('.bg-indigo-600.text-white');
        if (saveButton) saveButton.setAttribute('data-i18n', 'save');
        
        const labels = document.querySelectorAll('label');
        labels.forEach(label => {
            const text = label.textContent.trim();
            if (text === '标题') label.setAttribute('data-i18n', 'title');
            if (text === '日期') label.setAttribute('data-i18n', 'date');
            if (text === '分类') label.setAttribute('data-i18n', 'category');
            if (text === '颜色') label.setAttribute('data-i18n', 'color');
            if (text === '备注（可选）') label.setAttribute('data-i18n', 'notes');
            if (text === '开启提醒') label.setAttribute('data-i18n', 'enable_reminder');
        });
        
        // 输入框占位符
        const titleInput = document.querySelector('#title');
        if (titleInput) titleInput.setAttribute('data-i18n', 'title_placeholder');
        
        const notesTextarea = document.querySelector('#notes');
        if (notesTextarea) notesTextarea.setAttribute('data-i18n', 'notes_placeholder');
        
        // 自定义分类按钮
        const customButton = document.querySelector('.category-chip:last-child');
        if (customButton) {
            const customText = customButton.querySelector('span') || customButton;
            if (customText.textContent.includes('自定义')) {
                customText.setAttribute('data-i18n', 'custom');
            }
        }
    }
    
    // 详情页
    if (window.location.pathname.includes('countdown_detail.html')) {
        const detailTitle = document.querySelector('h1');
        if (detailTitle) detailTitle.setAttribute('data-i18n', 'countdown_detail');
        
        // 操作按钮
        const actionButtons = document.querySelectorAll('.action-button span');
        actionButtons.forEach(span => {
            const text = span.textContent.trim();
            if (text === '分享') span.setAttribute('data-i18n', 'share');
            if (text === '背景') span.setAttribute('data-i18n', 'background');
            if (text === '删除') span.setAttribute('data-i18n', 'delete');
        });
        
        // 提醒设置
        const reminderLabel = document.querySelector('.glass-effect .flex.items-center span');
        if (reminderLabel && reminderLabel.textContent.includes('提醒')) {
            reminderLabel.setAttribute('data-i18n', 'reminder');
        }
        
        const daysBeforeText = document.querySelector('.text-gray-600.mr-3');
        if (daysBeforeText && daysBeforeText.textContent.includes('提前7天')) {
            daysBeforeText.setAttribute('data-i18n', 'days_before');
        }
        
        // 倒数日圆形展示
        const daysLeftCircle = document.querySelector('.countdown-circle .text-gray-600.text-sm');
        if (daysLeftCircle && daysLeftCircle.textContent.includes('距离还有')) {
            daysLeftCircle.setAttribute('data-i18n', 'days_left');
        }
        
        const dayUnitCircle = document.querySelector('.countdown-circle .text-gray-600.text-lg');
        if (dayUnitCircle && dayUnitCircle.textContent.includes('天')) {
            dayUnitCircle.setAttribute('data-i18n', 'day');
        }
    }
}