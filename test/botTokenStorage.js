/*
 * @author David Menger
 */
'use strict';

const assert = require('assert');
const BotTokenStorage = require('../src/BotTokenStorage');

const SECRET = 'foobar';

const SENDER_ID = 'hello';
const SENDER_ID2 = 'hello2';
const PAGE_ID = 'pageid';

describe('<BotTokenStorage>', function () {

    describe('#getOrCreateToken()', () => {

        it('creates token', async () => {
            const bts = new BotTokenStorage(SECRET);

            let token = await bts.getOrCreateToken(SENDER_ID, PAGE_ID);

            assert.strictEqual(token.senderId, SENDER_ID, PAGE_ID);
            assert.strictEqual(token.pageId, PAGE_ID);
            assert.strictEqual(typeof token.token, 'string');

            token = await bts.getOrCreateToken(SENDER_ID, PAGE_ID);

            assert.strictEqual(token.senderId, SENDER_ID);
            assert.strictEqual(token.pageId, PAGE_ID);
            assert.strictEqual(typeof token.token, 'string');
        });

        it('avoids collisions', async () => {
            const bts = new BotTokenStorage(SECRET);

            const tokens = await Promise.all([
                bts.getOrCreateToken('a', PAGE_ID),
                bts.getOrCreateToken('a', PAGE_ID)
            ]);

            assert.ok(tokens.every((t) => t.senderId === 'a' && typeof t.token === 'string'));
        });

    });

    describe('#findByToken()', () => {

        it('is able to find token', async () => {
            const bts = new BotTokenStorage(SECRET);

            let token = await bts.findByToken('nonexisting');

            assert.strictEqual(token, null);

            const t = await bts.getOrCreateToken(SENDER_ID2, PAGE_ID);

            token = await bts.findByToken(t.token);

            assert.strictEqual(token.senderId, SENDER_ID2);
            assert.strictEqual(token.pageId, PAGE_ID);
            assert.strictEqual(typeof token.token, 'string');
        });

        it('no token returns null response', async () => {
            const bts = new BotTokenStorage(SECRET);

            const token = await bts.findByToken('');

            assert.strictEqual(token, null);
        });

    });

});
