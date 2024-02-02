export function addEventListenerSafe(element, eventName, handler) {
    // 检查是否已存在相同的事件监听器
    var eventListeners = element.listeners || {};
    if (!eventListeners[eventName]) {
        // 如果不存在，则绑定事件监听器
        element.addEventListener(eventName, handler);
        // 记录已绑定的监听器
        eventListeners[eventName] = handler;
        element.listeners = eventListeners;
    }
}