import * as SQLite from "expo-sqlite";

export const openDatabase = async () => {
    return SQLite.openDatabase('dictionary.db');
};

export const createTable = async (db: any) => {
    // create table if not exists
    console.log('creating table')
    const history = `CREATE TABLE IF NOT EXISTS history (
        word TEXT NOT NULL,
        location INT NOT NULL
    );`;
    const insert = `INSERT INTO history VALUES ('alien',1)`;
    await db.transaction(async (tx: any) => {
        await tx.executeSql(history);
    });
    await db.transaction(async (tx: any) => {
        await tx.executeSql(insert);
    });
    const bookmark = `CREATE TABLE IF NOT EXISTS bookmark(
    word TEXT NOT NULL,
    location INT NOT NULL
);`;
    await db.transaction(async (tx: any) => {
        await tx.executeSql(bookmark);
    });
};

export const getWordHistory = async (db: any) => {
    const query = `SELECT * FROM history`;
    let data = [];
    const results = await db.transaction(async (tx: any) => {
        return await tx.executeSql(query,null,
            function (tx: any, resultSet : any) {
                let data = [];
                for (let i = 0, c = resultSet.rows.length;i < c;i++) {
                    data.push(resultSet.rows.item(i));
                }
            },
            function (tx : any, error : any) {
                console.log(error.message);
            });
        
    });
    console.log('res',results);
    return results || [];
};