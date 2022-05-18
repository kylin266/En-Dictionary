import * as SQLite from "expo-sqlite";
import { useState } from "react";

export const openDatabase = async () => {
    return SQLite.openDatabase('dictionary2.db');
};

export const createTable = async (db: any) => {
    ///create table
    const history = `CREATE TABLE IF NOT EXISTS history (
            word TEXT NOT NULL,
            location INT AUTO INCREMENT NOT NULL
        );`;
    await db.transaction(async (tx: any) => {
        await tx.executeSql(history);
    });

    const bookmark = `CREATE TABLE IF NOT EXISTS bookmark (
            word TEXT NOT NULL
        );`;

    await db.transaction(async (tx: any) => {
        await tx.executeSql(history);
    });
    await db.transaction(async (tx: any) => {
        await tx.executeSql(bookmark);
    });
    console.log('created');
    // cleardata
    let clearData = 'DELETE FROM history';
    await db.transaction(async (tx: any) => {
        await tx.executeSql(clearData);
    });
    let clearData2 = 'DELETE FROM bookmark';
    await db.transaction(async (tx: any) => {
        await tx.executeSql(clearData2);
    });



    // const insert = `INSERT INTO history VALUES ('alien',1)`;

    // const insert2 = `INSERT INTO bookmark VALUES ('alkahest')`;
    // await db.transaction(async (tx: any) => {
    //     await tx.executeSql(insert);
    // });

    // await db.transaction(async (tx: any) => {
    //     await tx.executeSql(insert2);
    // });

};

export const getWordHistory = async (db: any) => {
    const query = `SELECT * FROM history`;
    return new Promise<any>(async resolve =>
        await db.transaction(async (tx: any) => {
            await tx.executeSql(query, null,
                (tx: any, resultSet: any) => {
                    let data = [];
                    for (let i = 0, c = resultSet.rows.length; i < c; i++) {
                        data.push(resultSet.rows.item(i));
                    }
                    resolve(data);
                },
                (tx: any, error: any) => {
                    console.log(error.message);
                });

        })
    );
};
export const getWordBookmark = async (db: any) => {
    const query = `SELECT * FROM bookmark`;
    return new Promise<any>(async resolve =>
        await db.transaction(async (tx: any) => {
            await tx.executeSql(query, null,
                (tx: any, resultSet: any) => {
                    let data = [];
                    for (let i = 0, c = resultSet.rows.length; i < c; i++) {
                        data.push(resultSet.rows.item(i));
                    }
                    resolve(data);
                },
                (tx: any, error: any) => {
                    console.log(error.message);
                });

        })
    );
};
export const getWordHistoryByLocation = async (db: any) => {
    const query = `SELECT * FROM history Order by location DESC`;
    return new Promise<any>(async resolve =>
        await db.transaction(async (tx: any) => {
            await tx.executeSql(query, null,
                (tx: any, resultSet: any) => {
                    let data = [];
                    for (let i = 0, c = resultSet.rows.length; i < c; i++) {
                        data.push(resultSet.rows.item(i));
                    }
                    resolve(data);
                },
                (tx: any, error: any) => {
                    console.log(error.message);
                });

        })
    );
};
export const getWordHistoryByWord = async (db: any, word: any) => {
    const query = `SELECT * FROM history WHERE word = '${word}'`;
    return new Promise<any>(async resolve =>
        await db.transaction(async (tx: any) => {
            await tx.executeSql(query, null,
                (tx: any, resultSet: any) => {
                    let data = [];
                    for (let i = 0, c = resultSet.rows.length; i < c; i++) {
                        data.push(resultSet.rows.item(i));
                    }
                    resolve(data[0]);
                },
                (tx: any, error: any) => {
                    console.log(error.message);
                });

        })
    );
};
export const getWordBookmarkByWord = async (db: any, word: any) => {
    const query = `SELECT * FROM bookmark WHERE word = '${word}'`;
    return new Promise<any>(async resolve =>
        await db.transaction(async (tx: any) => {
            await tx.executeSql(query, null,
                (tx: any, resultSet: any) => {
                    let data = [];
                    for (let i = 0, c = resultSet.rows.length; i < c; i++) {
                        data.push(resultSet.rows.item(i));
                    }
                    resolve(data[0]);
                },
                (tx: any, error: any) => {
                    console.log(error.message);
                });

        })
    );
};

export const UpdateWordLocation = async (db: any, word: any, location: any) => {
    const update = `UPDATE history SET location = ${location} WHERE word =  '${word}'`;
    await db.transaction(async (tx: any) => {
        await tx.executeSql(update);
    });
}
export const insertBookmark = async (db: any, word: any) => {
    const insert = `INSERT INTO bookmark VALUES ('${word}')`;
    await db.transaction(async (tx: any) => {
        await tx.executeSql(insert);
    });
}
export const deleteBookmark = async (db: any, word: any) => {
    const clear = `DELETE FROM bookmark WHERE word = '${word}'`;
    await db.transaction(async (tx: any) => {
        await tx.executeSql(clear);
    });
}

export const insertHistory = async (db: any, word: any, location: any) => {
    const insert = `INSERT INTO history VALUES ('${word}',${location})`;
    await db.transaction(async (tx: any) => {
        await tx.executeSql(insert);
    });
}
export const addHistory = async (db: any, word: any) => {
    const data = await getWordHistoryByLocation(db);
    const found = await getWordHistoryByWord(db, word);
    if (data && data.length > 0) {
        if (found) {
            await UpdateWordLocation(db, word, data[0].location + 1);
        }
        else {
            await insertHistory(db, word, data[0].location + 1);
        }
    }
    else {
        await insertHistory(db, word, 1);
    }
}