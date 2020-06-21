/*
 * This is the basic function vastly used in in reducers to update or concatinate
 * their old object with new properties
 */

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};
