'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _promise = require('mysql2/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // 'admin': 'Pass!word1'


var getDb = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return _promise2.default.createConnection({
							host: 'notes.ccrnjb6da1jf.us-east-1.rds.amazonaws.com',
							user: 'admin',
							password: 'Pass!word1',
							database: 'pers_notes'
						});

					case 2:
						return _context.abrupt('return', _context.sent);

					case 3:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function getDb() {
		return _ref.apply(this, arguments);
	};
}();

var getNotesForUser = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(uid, callback) {
		var db, _ref3, _ref4, rows, fields;

		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.next = 2;
						return getDb();

					case 2:
						db = _context2.sent;
						_context2.next = 5;
						return db.execute('SELECT content, page FROM notes WHERE uid=' + uid);

					case 5:
						_ref3 = _context2.sent;
						_ref4 = _slicedToArray(_ref3, 2);
						rows = _ref4[0];
						fields = _ref4[1];

						callback(rows);

					case 10:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined);
	}));

	return function getNotesForUser(_x, _x2) {
		return _ref2.apply(this, arguments);
	};
}();

var createNewNote = function () {
	var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(note, callback) {
		var db, sqlQuery;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.next = 2;
						return getDb();

					case 2:
						db = _context3.sent;
						sqlQuery = 'INSERT INTO notes (uid, content, page) VALUES (' + note.uid + ', "' + note.content + '", ' + note.page + ')';
						_context3.next = 6;
						return db.execute(sqlQuery).then(function () {
							callback(201);
						}).catch(function (error) {
							console.log(error);
							callback(400);
						});

					case 6:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined);
	}));

	return function createNewNote(_x3, _x4) {
		return _ref5.apply(this, arguments);
	};
}();

var deleteNote = function () {
	var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(noteId, callback) {
		var db, sqlQuery;
		return regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_context4.next = 2;
						return getDb();

					case 2:
						db = _context4.sent;
						sqlQuery = 'DELETE from notes where id=' + noteId;
						_context4.next = 6;
						return db.execute(sqlQuery).then(function () {
							callback(200);
						}).catch(function (error) {
							console.log(error);
							callback(400);
						});

					case 6:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, undefined);
	}));

	return function deleteNote(_x5, _x6) {
		return _ref6.apply(this, arguments);
	};
}();

exports.default = {
	getNotesForUser: getNotesForUser,
	createNewNote: createNewNote,
	deleteNote: deleteNote
};