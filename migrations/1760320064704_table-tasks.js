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

    pgm.createType('status', ['todo', 'in_progress', 'completed'])

    pgm.createTable('tasks', {
        id: {type: 'VARCHAR(255)', notNull: true, primaryKey: true},
        user_id : {type: 'VARCHAR(255)', notNull: true, references: 'users', onDelete: 'CASCADE'},
        status:{ type: 'status', notNull: false, default: 'todo'},
        title: { type: 'VARCHAR(255)', notNull: true},
        description: { type: 'VARCHAR(255)'},
        created_at: { type: 'TIMESTAMPTZ', notNull: true, default: pgm.func('current_timestamp')},
        updated_at: { type: 'TIMESTAMPTZ', notNull: true, default: pgm.func('current_timestamp')}
    })

    pgm.addConstraint('tasks', 'fk_tasks_user_id', {
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
    pgm.dropTable('tasks')
    pgm.dropConstraint('tasks', 'fk_tasks_user_id')
};
