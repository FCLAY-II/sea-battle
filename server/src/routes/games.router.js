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
  // const record = await UsersGame.findAll({
  //   attributes: ['playerId', 'field'],
  //   where: {
  //     gameId: res.locals.gameId,
  //   },
  // });

  const records = await User.findAll({
    attributes: ['id', 'login'],
    include: {
      model: Game,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      through: { attributes: ['field'] },
      where: { id: res.locals.gameId },
    },
    raw: true,
  });

  const result = {
    id: res.locals.gameId,
    field: null,
    enemy: {
      id: null,
      login: null,
      field: null,
    },
  };

  if (records[0].id === res.locals.userId) {
    result.field = records[0]['Games.UsersGame.field'];
    result.enemy.id = records[1].id;
    result.enemy.login = records[1].login;
    result.enemy.field = records[1]['Games.UsersGame.field'];
  } else {
    result.field = records[1]['Games.UsersGame.field'];
    result.enemy.id = records[0].id;
    result.enemy.login = records[0].login;
    result.enemy.field = records[0]['Games.UsersGame.field'];
  }

  // let field;
  // let enemyField;

  // if (record[0].playerId === res.locals.userId) {
  //   field = record[0].field;
  //   enemyField = record[1].field;
  // } else {
  //   field = record[1].field;
  //   enemyField = record[0].field;
  // }

  // const result = {
  //   id: res.locals.gameId,
  //   field,
  //   enemy: {
  //     id: playerId,
  //     field: enemyField,
  //   },
  // };

  // res.json(result);

  res.json(result);
});

router.patch('/:id/make-turn/:cellId', async (req, res) => {
  // TODO: improve game logic
  const cellId = +req.params.cellId;

  const gameRecord = await Game.findByPk(res.locals.gameId);

  if (gameRecord) {
    console.log(res.locals.userId);
    if (gameRecord.currentPlayerId === res.locals.userId) {
      const record = await UsersGame.findOne({
        where: {
          gameId: res.locals.gameId,
          playerId: {
            [Op.ne]: gameRecord.currentPlayerId,
          },
        },
      });

      // console.log(stringReplaceAt(record.field, 2, '2'));
      record.field = stringReplaceAt(record.field, cellId, '2');
      // console.log(gameRecord.currentPlayerId);
      gameRecord.currentPlayerId = record.playerId;
      await record.save();
      await gameRecord.save();
      // console.log(gameRecord.currentPlayerId);
      // console.log(record, gameRecord);
      res.json({ id: record.playerId, field: record.field });
    } else {
      console.log('rights');
      res.status(401).json({ message: 'недостаточно прав для совершения хода' });
    }
  } else {
    res.status(402).json({ message: 'совершить ход в данной игре невозможно' });
  }
});

module.exports = router;
