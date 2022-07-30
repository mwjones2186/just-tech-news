const router = require('express').Router();
const {User, Post, Vote} = require('../../models');


router.get('/', (req,res)=>{
    User.findAll({
        attributes: { exclude: ['password']}
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(error =>{
            console.log(error);
            res.status(500).json
        });
});

router.get('/:id', (req, res)=>{
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        },
        include: [
            {
              model: Post,
              attributes: [
                'id', 
                'title', 
                'post_url', 
                'created_at'
            ]
            },
            {
              model: Post,
              attributes: ['title'],
              through: Vote,
              as: 'voted_posts'
            }
          ]
         
    })
    .then(dbUserData=>{
        if (!dbUserData) {
            res.status(404).json({message: 'No user found with this ID'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json(error);
    });
});

router.post('/', (req, res)=>{
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData=> res.json(dbUserData))
    .catch(error =>{
        console.log(error);
        res.status(500).json(error)
    });
});

router.post('/login', (req, res)=>{
    user.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData =>{
        if (!dbUserData) {
            res.status(400).json({message: 'No user with that email address!'});
            return;
        }
        res.json({user:dbUserData});
        
        const validPassword = dbUserData.checkPassword(req.body.password);
        
        if (!validPassword) {
            res.status(400).json({message: 'Incorrect Password!'});
            return;
        }
        res.json({user: dbUserData, message: 'You are now logged in!'});
    });
});

router.put('/:id', (req, res)=>{
    User.update(req, body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData =>{
        if (!dbUserDate[0]) {
            res.status(404).json({message: 'No user found with this ID'});
            return;
        }
        res.json(dbUserData)
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json(error);
    });
});

router.delete('/:id', (req, res)=>{
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData =>{
        if (!dbUserData) {
            res.status(404).json({message: 'No user found with this ID'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json(error)
    });
});


module.exports = router;