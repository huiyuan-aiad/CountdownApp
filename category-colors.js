/**
 * category-colors.js
 * 用于管理类别与颜色的永久映射关系
 */

// 存储键名
const CATEGORY_COLORS_KEY = 'countdown_app_category_colors';

// 默认类别颜色映射
const DEFAULT_CATEGORY_COLORS = {
    // 固定类别
    '学习': 'indigo-500',
    '工作': 'pink-500',
    '生活': 'purple-500',
    '节日': 'blue-500',
    // 自定义类别
    '自定义1': 'green-500',
    '自定义2': 'yellow-500',
    '自定义3': 'red-500',
    '自定义4': 'gray-500'
};

/**
 * 初始化类别颜色映射
 * 如果本地存储中不存在类别颜色映射，则使用默认映射
 */
function initCategoryColors() {
    try {
        // 检查本地存储中是否已存在类别颜色映射
        const existingMapping = localStorage.getItem(CATEGORY_COLORS_KEY);
        
        if (!existingMapping) {
            // 如果不存在，则使用默认映射并保存到本地存储
            localStorage.setItem(CATEGORY_COLORS_KEY, JSON.stringify(DEFAULT_CATEGORY_COLORS));
            console.log('类别颜色映射已初始化');
        } else {
            console.log('类别颜色映射已存在，无需初始化');
        }
    } catch (error) {
        console.error('初始化类别颜色映射失败:', error);
    }
}

/**
 * 获取所有类别颜色映射
 * @returns {Object} 类别颜色映射对象
 */
function getCategoryColors() {
    try {
        const data = localStorage.getItem(CATEGORY_COLORS_KEY);
        return data ? JSON.parse(data) : DEFAULT_CATEGORY_COLORS;
    } catch (error) {
        console.error('获取类别颜色映射失败:', error);
        return DEFAULT_CATEGORY_COLORS;
    }
}

/**
 * 获取指定类别的颜色
 * @param {string} category 类别名称
 * @returns {string} 颜色值
 */
function getCategoryColor(category) {
    const categoryColors = getCategoryColors();
    // 处理自定义类别的情况
    if (category.startsWith('自定义') && !categoryColors[category]) {
        // 如果是未知的自定义类别，根据序号分配对应的自定义颜色
        const customIndex = parseInt(category.replace('自定义', ''));
        if (!isNaN(customIndex) && customIndex >= 1 && customIndex <= 4) {
            return categoryColors[`自定义${customIndex}`];
        }
    }
    return categoryColors[category] || 'indigo-500'; // 默认返回indigo-500
}

/**
 * 获取所有颜色值数组
 * @returns {Array} 颜色值数组
 */
function getAllCategoryColors() {
    const categoryColors = getCategoryColors();
    return Object.values(categoryColors);
}

/**
 * 获取按固定顺序排列的类别颜色数组
 * 确保颜色按照固定的类别顺序返回，保证颜色分配的一致性
 * @returns {Array} 按固定顺序排列的颜色值数组
 */
function getOrderedCategoryColors() {
    const categoryColors = getCategoryColors();
    // 固定的类别顺序
    const orderedCategories = [
        '学习',
        '工作',
        '生活',
        '节日',
        '自定义1',
        '自定义2',
        '自定义3',
        '自定义4'
    ];
    
    // 按照固定顺序返回颜色值
    return orderedCategories.map(category => categoryColors[category] || 'indigo-500');
}

/**
 * 获取所有类别名称数组
 * @returns {Array} 类别名称数组
 */
function getAllCategories() {
    const categoryColors = getCategoryColors();
    return Object.keys(categoryColors);
}

// 页面加载时初始化类别颜色映射
document.addEventListener('DOMContentLoaded', function() {
    initCategoryColors();
});