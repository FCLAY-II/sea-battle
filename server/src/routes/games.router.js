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
    status: null,
    enemy: {
      id: null,
      login: null,
      field: null,
    },
  };
  result.status = records[0]['Games.status'];
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
  res.json(result);
});

router.post('/new', async (req, res) => {
  const { player1Id, player2Id } = req.body;
  try {
    const newGame = await Game.create({ currentPlayerId: player1Id, status: 'preparation' });
    await UsersGame.create({ playerId: player1Id, gameId: newGame.id });
    await UsersGame.create({ playerId: player2Id, gameId: newGame.id });
    res.json({ gameId: newGame.id });
  } catch (err) {
    res.sendStatus(500);
  }
});

router.put('/:id/finish', async (req, res) => {
  const { loserId } = req.body;
  const gameId = req.params.id;
  try {
    const game = Game.findByPk(gameId);
    game.status = 'finished';
    game.currentPlayerId = loserId;
    game.save();
    res.json(game);
  } catch (err) {
    res.sendStatus(500);
  }

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
      if (record.field[cellId] === '1'
        && (record.field[cellId + 1] !== '1' && record.field[cellId - 1] !== '1'
          && record.field[cellId + 10] !== '1' && record.field[cellId - 10] !== '1')) {
        record.field = stringReplaceAt(record.field, cellId, '4');
        await record.save();
      } else if (record.field[cellId] === '1') {
        const shotsArr = [];
        let shipLength = 1;
        let i = 1;
        while (cellId + i < 100 && record.field[cellId + i] !== '0' && record.field[cellId + i] !== '2') {
          shipLength += 1;
          if (record.field[cellId + i] === '3') {
            shotsArr.push(cellId + i);
          }
          i += 1;
        }
        while (cellId - i > 0 && record.field[cellId - i] !== '0' && record.field[cellId - i] !== '2') {
          shipLength += 1;
          if (record.field[cellId - i] === '3') {
            shotsArr.push(cellId - i);
          }
          i += 1;
        }
        while (cellId + i * 10 < 100 && record.field[cellId + i * 10] !== '0' && record.field[cellId + i * 10] !== '2') {
          shipLength += 1;
          if (record.field[cellId + i * 10] === '3') {
            shotsArr.push(cellId + i * 10);
          }
          i += 1;
        }
        while (cellId - i * 10 > 0 && record.field[cellId - i * 10] !== '0' && record.field[cellId - i * 10] !== '2') {
          shipLength += 1;
          if (record.field[cellId - i * 10] === '3') {
            shotsArr.push(cellId - i * 10);
          }
          i += 1;
        }
        if (shipLength === shotsArr.length) {
          for (let j = 0; j < shotsArr.length; j += 1) {
            stringReplaceAt(record.field, shotsArr[j], '4');
          }
          await record.save();
        } else {
          record.field = stringReplaceAt(record.field, cellId, '3');
          await record.save();
        }
      } else if (record.field[cellId] === '0') {
        record.field = stringReplaceAt(record.field, cellId, '2');
        await record.save();
        gameRecord.currentPlayerId = record.playerId;
        await gameRecord.save();
      }

      // console.log(gameRecord.currentPlayerId);
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
