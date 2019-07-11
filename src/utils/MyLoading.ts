export const MyLoading = {
    /**
     * 显示加载框
     */
    show: () => {
        let Loading = document.getElementById('rejiejay-loading');
        // 判断加载框是否不存在
        if (!Loading) {
            // 不存在的情况下才创建
            Loading = document.createElement('div');
            Loading.id = 'rejiejay-loading';
            // tslint:disable-next-line: max-line-length
            Loading.innerHTML = `<div class="loading"><div class="loader"><div><div><div><div><div><div></div></div></div></div></div></div></div></div>`;
            document.body.appendChild(Loading);
        }
    },
    /**
     * 关闭加载框
     */
    hide: () => {
        const Loading = document.getElementById('rejiejay-loading');
        // 判断加载框是否存在
        if (Loading) {
            document.body.classList.remove('el-loading-parent--relative');
            document.body.removeChild(Loading);
        }
    }
};
