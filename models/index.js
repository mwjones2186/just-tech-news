const User = require('./User');
const Post = require('/Post');

User.hasMany(Post, {
    foreignKey: 'user-id'
});

Post.belongsTo(User, {
    foreignKey: 'user-id'
});


module.exports = {User, Post};