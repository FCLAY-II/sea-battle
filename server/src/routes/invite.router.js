const router = require('express').Router();
const { User, UsersGame, Game, Invite } = require('../db/models');

router.post('/new', async (reg, res) => {
  const { hostId, guestId } = reg.body;
  try {
    const newInvite = await Invite.create({ hostId, guestId });
    res.json(newInvite);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  const inviteId = req.params.id;
  try {
    const invite = await Invite.findByPk(inviteId);
    await invite.destroy();
  } catch (err) {
    res.sendStatus(500);
  }
});


router.get('/:userId', async (req, res) => {
  const playerId = req.params.userId;
  try {
    const result = await User.findAll({
      include: [{
        model: User,
        as: 'Guest'
      }],
      where: { id: playerId }
    });
    res.sendStatus({ result })
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
