/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {

    pgm.createType('provider', ['cridential', 'google']);


    pgm.createTable('users', {
        id: {type: 'VARCHAR(255)', notNull: true, primaryKey: true},
        username: {type: 'VARCHAR(16)', notNull: true, unique: true},
        email: {type: 'VARCHAR(255)', notNull : true, unique: true},
        password: {type: 'VARCHAR(255)', notNull: true},
        provider: {type: 'provider', default: 'cridential', notNull: true,},
        created_at: {type: 'TIMESTAMPTZ', notNull: true, default: pgm.func('current_timestamp')},
        updated_at: {type: 'TIMESTAMPTZ', notNull: true, default: pgm.func('current_timestamp')}
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('users');
    pgm.dropType('provider');
};
