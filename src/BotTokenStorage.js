/*
 * @author wingbot.ai
 */
'use strict';

const jsonwebtoken = require('jsonwebtoken');

/**
 * @typedef {object} Token
 * @prop {string} senderId
 * @prop {string} pageId
 * @prop {string} token
 */

/**
 * Storage for JWT tokens
 */
class BotTokenStorage {

    /**
     *
     * @param {string|Buffer} secretOrPrivateKey
     * @param {object} [jwtOptions]
     */
    constructor (secretOrPrivateKey, jwtOptions = {}) {
        this._secretOrPrivateKey = secretOrPrivateKey;
        this._jwtOptions = jwtOptions;
    }

    _verify (token) {
        return new Promise((resolve) => {
            jsonwebtoken.verify(
                token,
                this._secretOrPrivateKey,
                this._jwtOptions,
                (err, decoded) => {
                    if (err) {
                        resolve(null);
                    } else {
                        resolve(decoded);
                    }
                }
            );
        });
    }

    _sign (data) {
        return new Promise((resolve, reject) => {
            jsonwebtoken.sign(
                data,
                this._secretOrPrivateKey,
                this._jwtOptions,
                (err, token) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(token);
                    }
                }
            );
        });
    }

    /**
     *
     * @param {string} token
     * @returns {Promise<Token|null>}
     */
    findByToken (token) {
        if (!token) {
            return Promise.resolve(null);
        }

        return this._verify(token)
            .then((t) => (t ? Object.assign(t, { token }) : null));
    }

    /**
     *
     * @param {string} senderId
     * @param {string} pageId
     * @returns {Promise<Token|null>}
     */
    getOrCreateToken (senderId, pageId) {
        return this._sign({ senderId, pageId })
            .then((token) => ({ token, senderId, pageId }));
    }

}

module.exports = BotTokenStorage;
