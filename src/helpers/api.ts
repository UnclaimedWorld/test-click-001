// Имитация апишки
const imitator: Record<string, (data?: any) => { success: true, data: any }> = {
    'post/api/create'(data: { name: string, surname: string, description?: string }) {
        return {
            success: true,
            data
        };
    }
};

class Api {
    request(params: { method: 'put' | 'post' | 'get', url: string, data?: any }) {
        const DELAY = 200;
        let url = params.method + '/api' + params.url;

        return new Promise<any>((resolve, reject) => {
            if(url in imitator) {
                setTimeout(() => {
                    resolve(imitator[url](params.data));
                }, DELAY);
            } else {
                setTimeout(() => {
                    reject({
                        success: false,
                        message: `Запрос "${url}" не найден`
                    });
                }, DELAY);
            }
        });
    }
    get(url: string) {
        return this.request({
            url,
            method: 'get',
        });
    }
    post(url: string, data: any) {
        return this.request({
            url,
            method: 'post',
            data
        });
    }
}

export default new Api();