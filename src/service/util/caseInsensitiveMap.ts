// src: stackoverflow.com/questions/50019920/javascript-map-key-value-pairs-case-insensitive-search

class CaseInsensitiveMap<T, U> extends Map<T, U> {    
    set (key: T, value: U): this {
        return super.set(this.getStringKey(key), value);
    }

    get(key: T): U | undefined {
        return super.get(this.getStringKey(key));
    }

    getStringKey(key: T): T {
        if (typeof key === 'string') {
            return (key.toLowerCase() as any) as T;
        }

        return key;
    }
}

export default CaseInsensitiveMap;