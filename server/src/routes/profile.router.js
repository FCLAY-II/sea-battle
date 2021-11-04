const router = require('express').Router();
const { Op } = require('sequelize');
const { User, Game } = require('../db/models');

router.get('/users', async (req, res) => {
  let { _search: search } = req.query;
  search = search ? `.*${search.toLocaleLowerCase()}.*` : '.*';
  try {
    const result = await User.findAll({
      where: {
        login: {
          [Op.iRegexp]: search,
        },
      },
      limit: 8,
    });
    console.log('------------', result);
    return res.json(result);
  } catch (err) {
    return res.sendStatus(500);
  }
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
