/**
 * countdown-storage.js
 * 用于管理倒数日的本地存储、读取、更新和删除功能
 */

// 存储键名
const STORAGE_KEY = 'countdown_app_data';

/**
 * 获取所有倒数日
 * @returns {Array} 倒数日数组
 */
function getAllCountdowns() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('获取倒数日数据失败:', error);
        return [];
    }
}

/**
 * 添加新的倒数日
 * @param {Object} countdown 倒数日对象
 * @returns {Object} 添加后的倒数日对象（包含ID）
 */
function addCountdown(countdown) {
    try {
        const countdowns = getAllCountdowns();
        
        // 生成唯一ID
        countdown.id = generateUniqueId();
        
        // 添加创建时间
        countdown.createdAt = new Date().toISOString();
        
        // 添加到数组
        countdowns.push(countdown);
        
        // 保存到本地存储
        localStorage.setItem(STORAGE_KEY, JSON.stringify(countdowns));
        
        return countdown;
    } catch (error) {
        console.error('添加倒数日失败:', error);
        throw new Error('添加倒数日失败');
    }
}

/**
 * 更新倒数日
 * @param {string} id 倒数日ID
 * @param {Object} updatedData 更新的数据
 * @returns {Object|null} 更新后的倒数日对象，如果未找到则返回null
 */
function updateCountdown(id, updatedData) {
    try {
        const countdowns = getAllCountdowns();
        const index = countdowns.findIndex(item => item.id === id);
        
        if (index === -1) {
            console.warn(`未找到ID为${id}的倒数日`);
            return null;
        }
        
        // 更新数据
        const updatedCountdown = { ...countdowns[index], ...updatedData, updatedAt: new Date().toISOString() };
        countdowns[index] = updatedCountdown;
        
        // 保存到本地存储
        localStorage.setItem(STORAGE_KEY, JSON.stringify(countdowns));
        
        return updatedCountdown;
    } catch (error) {
        console.error('更新倒数日失败:', error);
        throw new Error('更新倒数日失败');
    }
}

/**
 * 删除倒数日
 * @param {string} id 倒数日ID
 * @returns {boolean} 是否删除成功
 */
function deleteCountdown(id) {
    try {
        const countdowns = getAllCountdowns();
        const filteredCountdowns = countdowns.filter(item => item.id !== id);
        
        if (filteredCountdowns.length === countdowns.length) {
            console.warn(`未找到ID为${id}的倒数日`);
            return false;
        }
        
        // 保存到本地存储
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredCountdowns));
        
        return true;
    } catch (error) {
        console.error('删除倒数日失败:', error);
        throw new Error('删除倒数日失败');
    }
}

/**
 * 根据ID获取倒数日
 * @param {string} id 倒数日ID
 * @returns {Object|null} 倒数日对象，如果未找到则返回null
 */
function getCountdownById(id) {
    try {
        const countdowns = getAllCountdowns();
        return countdowns.find(item => item.id === id) || null;
    } catch (error) {
        console.error('获取倒数日失败:', error);
        return null;
    }
}

/**
 * 根据分类筛选倒数日
 * @param {string} category 分类名称
 * @returns {Array} 筛选后的倒数日数组
 */
function filterCountdownsByCategory(category) {
    try {
        if (!category || category === '全部') {
            return getAllCountdowns();
        }
        
        const countdowns = getAllCountdowns();
        return countdowns.filter(item => item.category === category);
    } catch (error) {
        console.error('筛选倒数日失败:', error);
        return [];
    }
}

/**
 * 生成唯一ID
 * @returns {string} 唯一ID
 */
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

/**
 * 计算倒数天数
 * @param {string} targetDate 目标日期（YYYY-MM-DD格式）
 * @returns {number} 倒数天数
 */
function calculateDaysRemaining(targetDate) {
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const timeDiff = target.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

/**
 * 格式化日期为本地格式
 * @param {string} dateString 日期字符串（YYYY-MM-DD格式）
 * @returns {string} 格式化后的日期字符串
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

/**
 * 清除所有倒数日数据（慎用）
 */
function clearAllCountdowns() {
    try {
        localStorage.removeItem(STORAGE_KEY);
        console.log('所有倒数日数据已清除');
    } catch (error) {
        console.error('清除倒数日数据失败:', error);
        throw new Error('清除倒数日数据失败');
    }
}