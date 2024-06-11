/**
 * 监听文档的可见性变化事件，以改变文档标题以吸引用户注意力。
 * 当文档从可见变为不可见时，标题变为挽留用户的语言。
 * 当文档从不可见变为可见时，标题变为欢迎用户回来的语言，并在两秒后恢复原标题。
 * 使用 clearTimeout 来取消之前设置的标题恢复计时器，以确保标题在用户返回时正确更新。
 */
let originTitle = document.title
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = '(つェ⊂)别走啊，再玩会儿啊!'
    } else {
        document.title = '(つェ⊂)咦!你回来了!'
        setTimeout(() => {
            document.title = originTitle
        }, 2e3)
    }
})