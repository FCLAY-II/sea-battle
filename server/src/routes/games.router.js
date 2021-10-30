const router = require('express').Router();

const { Op } = require('sequelize');
const { User, UsersGame, Game } = require('../db/models');

function stringReplaceAt(str, index, replacement) {
  return str.slice(0, index) + replacement + str.slice(index + replacement.length);
}

router.use('/:id', (req, res, next) => {
  const gameId = req.params.id;
  res.locals.gameId = +gameId;
  next();
});

router.get('/:id', async (req, res) => {
  const record = await UsersGame.findAll({
    attributes: ['playerId', 'field'],
    where: {
      gameId: res.locals.gameId,
    },
  });

  const result = {
    id: res.locals.gameId,
    myField: record[0].field,
    enemyField: record[1].field,
  };

  res.json(result);
});

router.patch('/:id/make-turn/:cid', async (req, res) => {
  // TODO: improve game logic
  const { cellId } = req.params.cid;

  const gameRecord = await Game.findByPk(res.locals.gameId);

  if (gameRecord) {
    if (gameRecord.currentPlayerId === res.locals.userId) {
      const record = await UsersGame.findOne({
        where: {
          gameId: res.locals.gameId,
          playerId: {
            [Op.ne]: gameRecord.currentPlayerId,
          },
        },
      });

      record.field = stringReplaceAt(record.field, cellId, '2');
      gameRecord.currentPlayerId = record.playerId;
      await record.save();
      await gameRecord.save();

      console.log(record, gameRecord);
      res.json({ field: record.field });
    } else {
      res.status(401).json({ message: 'недостаточно прав для совершения хода' });
    }
  } else {
    res.status(402).json({ message: 'совершить ход в данной игре невозможно' });
  }
});

module.exports = router;
