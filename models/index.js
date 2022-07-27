const User = require('./user');
const Post = require('./post');

User.hasMany(Post, {
    foreignKey: 'user-id'
});

Post.belongsTo(User, {
    foreignKey: 'user-id'
});


module.exports = {User, Post};