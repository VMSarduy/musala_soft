import axios from 'axios';

export function hasValue(value) {
    return value !== undefined && value !== null && value !== '';
}

export function generateQueryObject(filters, page, pageSize, take) {
    const queryParams  = {};
    if (page !== undefined && page !== null) {
        queryParams.page = page;
    }

    if (pageSize !== undefined && pageSize !== null) {
        queryParams.pageSize = pageSize;
    }

    if (take !== undefined && take !== null) {
        queryParams.take = take;
    }

    if (filters) {
        Object.keys(filters).forEach((key) => {
            const filter = filters[key];
            if (hasValue(filter)) {
                const isObject = typeof filter === 'object';
                const isArray = Array.isArray(filter);

                if (isArray) {
                    queryParams[key] = filter.map((val) => !!val && !!val.value ? val.value : val);
                } else if (isObject) {
                    const keys = Object.keys(filter);
                    const hasValueKey = keys.some((k) => k === 'value');
                    if (hasValueKey) {
                        if (hasValue(filter.value)) {
                            queryParams[key] = filter.value;
                        }
                    } else {
                        keys.forEach((k) => {
                            if (filter[k] || filter[k] === 0) {
                                queryParams[k] = filter[k];
                            }
                        });
                    }
                } else {
                    queryParams[key] = filter;
                }
            }
        });
    }
    return queryParams;
}

export const generateParams = (obj) => {
    if (obj) {
        let queryParam = Object.keys(obj)
            .map((key) => {
                const value = obj[key];
                if (hasValue(value)) {
                    if (Array.isArray(value)) {
                        return value.map((val) => {
                            if (hasValue(val)) {
                                return `${key}=${val}`;
                            }
                            return null;
                        }).join('&');
                    }
                    return `${key}=${value}`;
                }
                return null;
            })
            .join('&');
        queryParam = queryParam && queryParam !== '' ? `${queryParam}&` : queryParam;
        queryParam = queryParam[queryParam.length - 1] === '&'
            ? queryParam.slice(0, Math.max(0, queryParam.length - 1))
            : queryParam;
        return queryParam;
    }
    return '';
};

export function generateQueryString({ filters, page, pageSize, take }) {
    const params = generateQueryObject(filters, page, pageSize, take);
    return generateParams(params);
}

export default function getAxiosInstance() {
    const axiosInstance = axios.create({
        paramsSerializer: generateQueryString
    });

    return axiosInstance;
}
