
export const convertObjectToCsv = object => {
    const filename = 'warfare_stat_block.csv';

    for(let key in object){
        console.log(`${key}: ${object[key]}`);
    };
};