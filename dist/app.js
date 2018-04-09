'use strict';

require('babel-polyfill');

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _notes = require('./controllers/notes');

var _notes2 = _interopRequireDefault(_notes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();
var router = new _koaRouter2.default();
app.use((0, _koaBodyparser2.default)());

router.get('/', function (ctx, next) {
	ctx.body = 'Hello world!';
});

router.use('/notes', _notes2.default.routes());

app.use(router.routes());

app.listen(3000);