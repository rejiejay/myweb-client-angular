export const TimeConvert = {
    /**
     * Date 转换 xxxx-xx-xx xx:00 字符串
     * @param myDate 要转换的日期
     * @return 日期字符串 2018-05-08 09:00
     */
    dateToYYYYmmDDhhMM00: (myDate: Date) => {
        const yyyy = myDate.getFullYear();

        const mm = myDate.getMonth() + 1;
        const mmstring = mm < 10 ? '0' + mm : mm;

        const dd = myDate.getDate();
        const ddstring = dd < 10 ? '0' + dd : dd;

        const hh = myDate.getHours();
        const hhstring = hh < 10 ? '0' + hh : hh;

        return `${yyyy}-${mmstring}-${ddstring} ${hhstring}:00`;
    },
};
