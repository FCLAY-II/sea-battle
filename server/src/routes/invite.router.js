const router = require('express').Router();
const { User, UsersGame, Game, Invite } = require('../db/models');

router.post('/new', async (reg, res) => {
  const hostId = res.locals.userId;
  const { guestId } = reg.body;
  try {
    await Invite.create({ hostId, guestId });
    res.json({});
  } catch (err) {
    res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  const inviteId = +req.params.id;
  try {
    const invite = await Invite.findOne({ where: { id: inviteId } });
    await invite.destroy();
    res.json({ enemyId: invite.hostId });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get('/sent', async (req, res) => {
  const playerId = res.locals.userId;
  try {
    const invites = await User.findAll({
      include: [
        {
          model: User,
          through: { attributes: { include: ['id'] } },
          as: 'Guest',
        },
      ],
      where: { id: playerId },
    });
    const allInvites = invites[0].Guest;
    res.json({ allInvites });
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get('/received', async (req, res) => {
  const playerId = res.locals.userId;
  try {
    const invites = await User.findAll({
      include: [
        {
          model: User,
          through: { attributes: { include: ['id'] } },
          as: 'Host',
        },
      ],
      where: { id: playerId },
    });
    const allInvites = invites[0].Host;
    res.json({ allInvites });
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
