export interface Consequencer {
    result: number;
    data: any;
    message: string;
}

export const consequent = {
    /**
     * 请求成功
     * @param data 返回成功的数据封装
     * @param message 返回成功的信息封装
     * @return 成功封装的结果
     */
    success: (data: any, message: string) => ({
        result: 1,
        data: data || null,
        message: message || 'success'
    }),

    /**
     * 请求失败
     * @param message 返回失败的信息封装
     * @param result 返回失败的数据封装
     * @param data 返回失败的数据封装
     * @return 失败封装的结果
     */
    error: (message: string, result: number, data: any) => ({
        result: result || 0,
        data: data || null,
        message
    })
};
