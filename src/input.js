// input.js


/* Function: dateFormat
 * Purpose: Formats input date to API format
 * Arguments: Date object
 * Return Value: Formatted string of date
 */
function formatDate(date)
{
    let YYYY = date.getUTCFullYear().toString();
    let mm = date.getUTCMonth() + 1;
    let dd = date.getUTCDate();
    let MM = mm < 10 ? '0' + mm.toString() : mm.toString();
    let DD = dd < 10 ? '0' + dd.toString() : dd.toString();
    return (`${YYYY}-${MM}-${DD}`);
}

/* Function: isInvalidDate
 * Purpose: check if input date is a validdate
 * Arguments: Date object
 * Return Value: boolean, true if invalid
 */
function isInvalidDate(date)
{
    return (date.toString() === "Invalid Date")
}


module.exports = {
    formatDate: formatDate,
    isInvalidDate: isInvalidDate,
}
