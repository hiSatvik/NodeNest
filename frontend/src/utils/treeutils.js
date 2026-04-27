export const extractCleanTree = (tag) => {
    const cleanTag = {name: tag.name};

    if(tag.data !== undefined) {
        cleanTag.data = tag.data;
    }

    if(tag.children !== undefined) {
        cleanTag.children = tag.children.map(child => extractCleanTree(child));
    }

    return cleanTag;
}