
const createDate = (data:Date) => {
    const today = new Date(data);
    const year = today.getFullYear();
    let mm:string | number = today.getMonth() + 1; // Months start at 0!
    let dd:string | number = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return `${dd}-${mm}-${year}`;
}

export default createDate