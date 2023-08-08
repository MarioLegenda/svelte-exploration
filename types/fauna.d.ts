enum Collections {
    tasks,
}

type CollectionType = keyof typeof Collections;

interface FaunaQueryPagination<T> {
    data: {
        data: T,
    }[];
}