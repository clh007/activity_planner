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

/**
 * 计算给定日期与当前日期的时间差，并返回一个易于理解的字符串表示。
 * @param date 一个符合ISO 8601标准的日期字符串（yyyy-mm-dd）。
 * @returns 返回一个表示时间差的字符串，例如“3天前”、“1小时前”等。
 */
export const getDateDiff = (date: string) => {
    // 将日期字符串转换为UNIX时间戳（秒）
    let publishTime = Date.parse(date.replace(/-/gi, "/")) / 1000;
    let d_seconds: number,
        d_minutes: number,
        d_hours: number,
        d_days: number,
        timeNow = Math.floor(new Date().getTime() / 1000),
        d: number,
        publishTime_ = new Date(publishTime * 1000),
        Y = publishTime_.getFullYear(),
        M = publishTime_.getMonth() + 1,
        D = publishTime_.getDate(),
        H = publishTime_.getHours(),
        m = publishTime_.getMinutes(),
        s = publishTime_.getSeconds(),
        Y_, M_, D_, H_, m_, s_;

    // 保证日期时间的每一位数字都两位显示
    if (M < 10) {
        M_ = "0" + M.toString();
    } else {
        M_ = M.toString();
    }
    if (D < 10) {
        D_ = "0" + D.toString();
    } else {
        D_ = D.toString();
    }
    if (H < 10) {
        H_ = "0" + H.toString();
    } else {
        H_ = H.toString();
    }
    if (m < 10) {
        m_ = "0" + m.toString();
    } else {
        m_ = m.toString();
    }
    if (s < 10) {
        s_ = "0" + s.toString();
    } else {
        s_ = s.toString();
    }

    // 计算当前时间与发布时间的时间差
    d = timeNow - publishTime;
    // 根据时间差计算天、小时、分钟和秒
    d_days = Math.floor(d / 86400);
    d_hours = Math.floor(d / 3600);
    d_minutes = Math.floor(d / 60);
    d_seconds = Math.floor(d);

    // 根据时间差的长度返回不同的字符串表示
    if (d_days > 0 && d_days < 3) {
        return d_days + "天前";
    } else if (d_days <= 0 && d_hours > 0) {
        return d_hours + "小时前";
    } else if (d_hours <= 0 && d_minutes > 0) {
        return d_minutes + "分钟前";
    } else if (d_seconds < 60) {
        if (d_seconds <= 0) {
            return "刚刚发表";
        } else {
            return d_seconds + "秒前";
        }
    } else if (d_days >= 3 && d_days < 30) {
        return M_ + "-" + D_ + " " + H_ + ":" + m_;
    } else if (d_days >= 30) {
        return Y + "-" + M_ + "-" + D_ + " " + H_ + ":" + m_;
    }
}