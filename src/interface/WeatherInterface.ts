export interface SearchResultInterface {
    id: number;
    name: string;
}

export interface CityInterface {
    id: number;
    name: string;
    temp_c: number;
    condition: ConditionInterface;
}

interface ConditionInterface {
    text: string;
    code: number;
}