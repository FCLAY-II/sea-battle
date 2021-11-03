const router = require('express').Router();

const { Op } = require('sequelize');
const { User, UsersGame, Game } = require('../db/models');

const { checkField } = require('../util/fieldChecker');

function stringReplaceAt(str, index, replacement) {
  return str.slice(0, index) + replacement + str.slice(index + replacement.length);
}

router.use('/:id', (req, res, next) => {
  const gameId = req.params.id;
  res.locals.gameId = +gameId;
  next();
});

router.put('/:id', async (req, res) => {
  const { myField: field } = req.body;
  console.log('from put:', field);

  if (checkField(field)) {
    const game = await Game.findByPk(res.locals.gameId);
    const records = await UsersGame.findAll({
      where: {
        gameId: game.id,
      },
    });

    let enemyId;

    if (records[0].playerId === res.locals.userId) {
      records[0].field = field;
      enemyId = records[1].playerId;
      await records[0].save();
    } else {
      records[1].field = field;
      enemyId = records[0].playerId;
      await records[1].save();
    }

    if (game.status === 'preparation') {
      game.status = 'pending';
      await game.save();
      res.json({ status: game.status, enemyId });
    } else if (game.status === 'pending') {
      game.status = 'active';
      await game.save();
      res.json({ status: game.status, enemyId });
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
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

  const myIdx = (records[0].id === res.locals.userId) ? 0 : 1;
  const enemyIdx = (records[0].id === res.locals.userId) ? 1 : 0;

  result.status = records[0]['Games.status'];
  result.currentPlayerId = records[0]['Games.currentPlayerId'];
  result.field = records[myIdx]['Games.UsersGame.field'];
  result.enemy.id = records[enemyIdx].id;
  result.enemy.login = records[enemyIdx].login;
  result.enemy.field = records[enemyIdx]['Games.UsersGame.field'];

  if (result.status === 'active') {
    result.enemy.field = result.enemy.field.replace(/1/g, '0');
  }

  res.json(result);
});

router.post('/new', async (req, res) => {
  const { playerId } = req.body;
  try {
    const newGame = await Game.create({ currentPlayerId: res.locals.userId, status: 'preparation' });
    await UsersGame.create({ playerId: res.locals.userId, gameId: newGame.id });
    await UsersGame.create({ playerId, gameId: newGame.id });
    res.json({ gameId: newGame.id });
  } catch (err) {
    res.sendStatus(500);
  }
});

router.put('/:id/finish', async (req, res) => {
  const { winId } = req.body;
  const gameId = req.params.id;
  try {
    const game = Game.findByPk(gameId);
    game.status = 'finished';
    game.currentPlayerId = winId;
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

      if (record.field[cellId] === '1') {
        const shotsArr = [cellId];
        let shipLength = 1;
        let i = 1;
        if (cellId % 10 !== 9) {
          // if (cellId % 10 === 0 || (cellId % 10) % 9 !== 0) {
          while (((cellId + i) % 10 !== 0) && (record.field[cellId + i] === '1' || record.field[cellId + i] === '3')) {
            shipLength += 1;
            if (record.field[cellId + i] === '3') {
              shotsArr.push(cellId + i);
            }
            i += 1;
          }
          i = 1;
        }
        if (cellId % 10 !== 0) {
          i = 1;
          while (cellId - i >= 0 && ((cellId - i) % 10 !== 9) && (record.field[cellId - i] === '1' || record.field[cellId - i] === '3')) {
            shipLength += 1;
            if (record.field[cellId - i] === '3') {
              shotsArr.push(cellId - i);
            }
            i += 1;
          }
          i = 1;
        }
        i = 1;
        while (cellId + i * 10 < 100 && (record.field[cellId + i * 10] === '1' || record.field[cellId + i * 10] === '3')) {
          shipLength += 1;
          if (record.field[cellId + i * 10] === '3') {
            shotsArr.push(cellId + i * 10);
          }
          i += 1;
        }
        i = 1;
        while (cellId - i * 10 >= 0 && (record.field[cellId - i * 10] === '1' || record.field[cellId - i * 10] === '3')) {
          shipLength += 1;
          if (record.field[cellId - i * 10] === '3') {
            shotsArr.push(cellId - i * 10);
          }
          i += 1;
        }
        i = 1;
        if (shipLength === shotsArr.length) {
          for (let j = 0; j < shotsArr.length; j += 1) {
            record.field = stringReplaceAt(record.field, shotsArr[j], '4');
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

      if (!record.field.includes('1')) {
        gameRecord.status = 'finished';
        await gameRecord.save();
      }

      res.json({ id: record.playerId, field: record.field });
    } else {
      res.status(401).json({ message: 'недостаточно прав для совершения хода' });
    }
  } else {
    res.status(402).json({ message: 'совершить ход в данной игре невозможно' });
  }
});

module.exports = router;
