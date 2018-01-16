var stubDB = {};

/**
 * 定义用户类
 *
 * @param name 用户名称
 * @constructor
 */
function User(name) {}

/**
 * 保存用户.
 *
 * @param name 待保存的用户名称
 */
User.save = function(name) {
    stubDB[name] = name;
};

/**
 * 删除用户.
 *
 * @param name 待删除的用户名称
 */
User.delete = function(name) {
    delete stubDB[name];
};

/**
 * 检查是否包含该用户.
 *
 * @param name 待检查的用户名称
 * @returns {boolean} 如果包含则返回 true, 否则返回 false
 */
User.contains = function(name) {
    return stubDB[name] != null;
};

// Export the User class.
module.exports = User;