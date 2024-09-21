export const entityWithModifiedNode = (entity: any) => {
    const { node: { type, name, coordinates }, ...rest } = entity;
    return { ...rest, name, type, coordinates };
};