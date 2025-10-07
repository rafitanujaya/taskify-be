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
    pgm.createType('sender', ['bot', 'user'])

    pgm.createTable('chatbots', {
        id: {type: 'VARCHAR(255)', notNull: true, primaryKey: true},
        user_id: {type: 'VARCHAR(255)', notNull: true, references: 'users', onDelete: 'CASCADE'},
        sender_type: {type: 'sender', notNull: true},
        message: { type: 'TEXT', notNull: true },
        created_at: { type: 'TIMESTAMPTZ', notNull: true, default: pgm.func('current_timestamp')}
    })

    pgm.createConstraint('chatbots', 'fk_chatbots_user_id', {
        foreignKeys: {
            columns: 'user_id',
            references: 'users(id)',
            onDelete: 'CASCADE'
        }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('chatbots');
    pgm.dropConstraint('chatbots', 'fk_chatbots_user_id')
};
