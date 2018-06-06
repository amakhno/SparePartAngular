export class SparePartFilter {
    public nameFilter: string = '';
    public pageNumber: number = 0;
    public pageSize: number = 0;
    public sort: FilterSort = FilterSort.Empty;
    public markIds: number[] = [];
}

export enum FilterSort {
    Empty,
    NameUp,
    NameDown,
    IdUp,
    IdDown,
    DescriptionUp,
    DescriptionDown,
    PriceUp,
    PriceDown
}
