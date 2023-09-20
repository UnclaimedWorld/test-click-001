let id = 0;
// Имитация апишки
const imitator: Record<string, (data?: any) => { success: true, data: any }> = {
    'post/api/create'(data: { name: string, surname: string, description?: string }) {
        return {
            success: true,
            data: {
                ...data,
                id: ++id
            }
        };
    },
    'put/api/update/:id'(data: { id: number, name: string, surname: string, description?: string }) {
        return {
            success: true,
            data: {
                ...data,
                id: +data.id
            }
        };
    }
};

class Api {
    request(params: { method: 'put' | 'post' | 'get', url: string, data?: Record<string, any> }) {
        const DELAY = 200;
        let url = params.method + '/api' + params.url;

        return new Promise<any>((resolve, reject) => {
            if(params.method === 'put') {
                const id = url.slice(url.lastIndexOf('/') + 1);
                url = url.slice(0, url.lastIndexOf('/')) + '/:id';
                params.data!.id = id;
            }

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
    put(url: string, data: any) {
        return this.request({
            url,
            method: 'put',
            data
        });
    }
}

export default new Api();