export interface IFilterParser {
    getFilters: () => Map<string, string[]>;
    getSelectedOptions: (categoryName: string) => string[];
}

// TODO Test
export class URLFilterParser implements IFilterParser {
    private parsedFilters: Map<string, string[]> = new Map();

    constructor(params: URLSearchParams) {
        let allParams = params.entries();
        let param = allParams.next();
        
        while (!param.done) {
            let key = param.value[0];
            let value = param.value[1].split(',');
            let existingList = this.parsedFilters.get(key);
            if (!existingList) existingList = [];

            this.parsedFilters.set(key, existingList.concat(value));
            param = allParams.next();
        }
    }

    getFilters(): Map<string, string[]> {
        return new Map(this.parsedFilters);
    }

    getSelectedOptions(categoryName: string): string[] {
        let options = this.parsedFilters.get(categoryName);
        if (options) return options;
        return [];
    }
}