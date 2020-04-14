import CaseInsensitiveMap from "./caseInsensitiveMap";

export interface IQueryParser {
    getFilters: () => Map<string, string[]>;
    getSelectedOptions: (categoryName: string) => string[];
    getQuery: () => string;
}

// TODO Test
export class URLQueryParser implements IQueryParser {
    private parsedFilters: CaseInsensitiveMap<string, string[]> = new CaseInsensitiveMap();

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
        return new CaseInsensitiveMap(this.parsedFilters);
    }

    getSelectedOptions(categoryName: string): string[] {
        let options = this.parsedFilters.get(categoryName);
        if (options) return options;
        return [];
    }

    getQuery(): string {
        let query = this.parsedFilters.get('query');
        if (query) return query[0];
        return ''
    }
}