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

router.post('/:id/make-turn', async (req, res) => {
  // TODO: improve game logic
  const { cellId } = req.body;

  const gameRecord = await Game.findByPk(res.locals.gameId);

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
});

module.exports = router;
