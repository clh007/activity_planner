/**
 * 检查电话号码是否符合中国手机号码的格式。
 * 
 * @param phone 待检查的电话号码字符串。
 * @returns 如果电话号码符合指定格式，则返回true；否则返回false。
 */
export const phoneNumberStyle = (phone: string) => {
    // 定义正则表达式，用于匹配以1开头，第二位为3、4、5、6、7、8、9中的一个，后面跟着9个数字的字符串。
    let reg = /^1[3456789]\d{9}$/;
    // 使用正则表达式测试电话号码是否符合规定格式。
    if (!reg.test(phone)) {
        return false;
    }
    return true;
}

/**
 * 验证输入的字符串是否符合电子邮件地址的格式。
 *
 * @param email 待验证的电子邮件地址字符串。
 * @returns 如果电子邮件地址符合指定格式，则返回true；否则返回false。
 */
export const emailValidator = (email: string) => {
    // 定义正则表达式，用于匹配电子邮件地址的常见格式。
    let reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // 使用正则表达式测试电子邮件地址是否符合规定格式。
    if (!reg.test(email)) {
        return false;
    }
    return true;
}
