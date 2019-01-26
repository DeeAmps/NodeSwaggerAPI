export const formatResults = (results) => {
    let res = [];
    let obj = {}
    results.metaData.forEach((item)=> {
        obj[Object.values(item)[0]] = undefined
    });
    results.rows.forEach((item) => {
        let resObj = {}
        item.forEach((element, index) => {
            resObj[Object.keys(obj)[index]] = element
        })
        res.push(resObj)
    })
    return res

}