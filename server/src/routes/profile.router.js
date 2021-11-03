const router = require('express').Router();
const { User, Game, UsersGame } = require('../db/models');

router.get('/users', async (req, res) => {
  const allUsers = await User.findAll();
  res.json(allUsers);
});

router.get('/:id/statistic', async (req, res) => {
  const playerId = +req.params.id;
  try {
    const allGames = await User.findAll({
      include:
        { model: Game, where: { status: 'finished' } },
      where: { id: playerId },
    });
    const gamesCount = allGames[0].Games.length;
    const victories = await Game.findAll({ where: { currentPlayerId: playerId, status: 'finished' } });
    const victoriesCount = victories.length;
    const failCount = gamesCount - victoriesCount;
    res.json({ gamesCount, victoriesCount, failCount });
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
